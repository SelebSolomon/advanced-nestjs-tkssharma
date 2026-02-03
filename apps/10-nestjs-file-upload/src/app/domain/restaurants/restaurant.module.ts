import { Module } from '@nestjs/common';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantEntity } from './entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantAddressEntity } from './entities/restaurant-address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestaurantEntity, RestaurantAddressEntity]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
