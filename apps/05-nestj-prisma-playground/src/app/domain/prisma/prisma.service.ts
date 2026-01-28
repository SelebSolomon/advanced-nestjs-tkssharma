// prisma.service.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    //  Validate environment variable
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not defined');
    }

    const pool = new pg.Pool({
      connectionString,
    });

    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log: [
        { level: 'warn', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
    });

    // ✅ Listen to Prisma events
    this.$on('warn' as never, (e: any) => {
      this.logger.warn(e.message);
    });

    this.$on('error' as never, (e: any) => {
      this.logger.error(e.message);
    });
  }

  async onModuleInit() {
    const startTime = Date.now();

    try {
      this.logger.log('Connecting to database...');

      await this.$connect();

      // ✅ Test the connection
      await this.$queryRaw`SELECT 1 as connected`;

      const connectionTime = Date.now() - startTime;

      this.logger.log(
        ` Database connected successfully in ${connectionTime}ms`,
      );

      // Optional: Get database info
      const dbInfo = await this.getDatabaseInfo();
      this.logger.log(`PostgreSQL ${dbInfo.version}`);
      this.logger.log(`Database: ${dbInfo.database}`);
    } catch (error) {
      this.logger.error(' Database connection failed', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    this.logger.log(' Disconnecting from database...');
    await this.$disconnect();
    this.logger.log(' Database disconnected successfully');
  }

  private async getDatabaseInfo() {
    const [versionResult, dbResult] = await Promise.all([
      this.$queryRaw<Array<{ version: string }>>`SELECT version()`,
      this.$queryRaw<
        Array<{ current_database: string }>
      >`SELECT current_database()`,
    ]);

    return {
      version: versionResult[0].version.split(' ')[1],
      database: dbResult[0].current_database,
    };
  }

  // Helper method to check connection health
  async checkConnection(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error('Database health check failed', error);
      return false;
    }
  }
}
