import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DBModule } from '@dev/database';
import { UserModule } from './users/user.module';
import { UsersEntity } from './users/entities/user.entity';
import { LoggerMiddleware } from 'src/core/middleware/logger.middleware';
import { AppLogger } from 'src/core/middleware/app-log.middleware';
import { EmailModule } from '@dev/email';
import { ConfigModule, ConfigService } from '@dev/config';
import { HttpClientModule } from '@dev/http';

// this logics will take some time to digest so dont panic all are coming from the package folder... and there is also another method of register instead of registerAsync... so take your time to be practicing
@Module({
  imports: [
    HttpClientModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        apiUrl: config.get().externalApi.apiUrl,
        apiKey: config.get().externalApi.apiKey,
      }),
    }),
    EmailModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          service: config.get().email.service_name,
          user: config.get().email.username,
          pass: config.get().email.password,
        };
      },
    }),
    DBModule.forRoot({
      entities: [UsersEntity],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class DomainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(AppLogger).forRoutes('*');

    // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
  }
}
