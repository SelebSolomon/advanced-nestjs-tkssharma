import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DataSource, Like, QueryRunner, Repository } from 'typeorm';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { RestaurantAddressEntity } from '../entities/restaurant-address.entity';
import { ConfigService } from '@dev/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  AddressDto,
  CreateRestaurantBodyDto,
  getRestaurantByIdDto,
  SearchQueryDto,
} from '../dto/restaurant.dto';
import { groupBy } from '../utilities';
import { UserMetaData } from '../interface';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(RestaurantAddressEntity)
    private restaurantAddRepo: Repository<RestaurantAddressEntity>,
    private readonly connection: Connection,
    // private configService: ConfigService,
    // private eventEmitter: EventEmitter2,
  ) {}

  async getRestaurantById(param: getRestaurantByIdDto) {
    const { id } = param;

    const restaurant = await this.restaurantRepo.findOne({
      where: { id },
      select: { id: true, name: true },
      relations: { dishes: true },
    });

    if (!restaurant) {
      return null; // or throw NotFoundException
    }

    const address = await this.restaurantAddRepo.findOne({
      where: { restaurant: { id } },
    });

    const dishes = restaurant.dishes ?? [];

    const categories = groupBy(dishes, 'category');

    return {
      ...restaurant,
      dishes: categories,
      address,
    };
  }

  async getAllMyRestaurants(user: UserMetaData) {
    return await this.restaurantRepo.find({
      relations: ['dishes'],
    });
  }

  async search(queryParam: SearchQueryDto) {
    return await this.restaurantRepo.find({
      select: {
        id: true,
        name: true,
        description: true,
      },
      where: [
        {
          name: Like(`%${queryParam.search_text}%`),
        },
        {
          description: Like(`%${queryParam.search_text}%`),
        },
      ],
      relations: {
        dishes: true,
      },
      take: 5,
      skip: 0,
    });
  }

  async createRestaurant(payload: CreateRestaurantBodyDto) {
    let createdRestaurant = null;
    console.log(payload);
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      createdRestaurant = await this.createUserRestaurant(
        { ...payload, restaurant_address: payload.address },
        queryRunner,
      );
      await this.createAddress(payload.address, createdRestaurant, queryRunner);
      await queryRunner.commitTransaction();
      return createdRestaurant;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  async createUserRestaurant(payload, queryRunner: QueryRunner) {
    return await queryRunner.manager.save(RestaurantEntity, {
      ...payload,
    });
  }
  async createAddress(address: AddressDto, restaurant, queryRunner) {
    return await queryRunner.manager.save(RestaurantAddressEntity, {
      ...address,
      restaurant: restaurant,
    });
  }
}
