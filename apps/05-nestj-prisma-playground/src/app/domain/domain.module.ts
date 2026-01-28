import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DBModule } from '@dev/database';
import { LoggerMiddleware } from 'src/app/core/middleware/logger.middleware';
import { AppLogger } from 'src/app/core/middleware/app-log.middleware';
import { EmailModule } from '@dev/email';
import { ConfigModule, ConfigService } from '@dev/config';
import { HttpClientModule } from '@dev/http';
import { RestaurantAddressEntity } from './restaurants/entities/restaurant-address.entity';
import { RestaurantDishEntity } from './restaurants/entities/restaurants-dish.entity';
import { RestaurantEntity } from './restaurants/entities/restaurant.entity';
import { RestaurantController } from './restaurants/controllers/restaurant.controller';
import { RestaurantService } from './restaurants/services/restaurant.service';
import { RestaurantModule } from './restaurants/restaurant.module';
import { PrismaModule } from './prisma/prisma.module';

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
      entities: [
        RestaurantAddressEntity,
        RestaurantDishEntity,
        RestaurantEntity,
      ],
    }),
    RestaurantModule,
    PrismaModule,
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
