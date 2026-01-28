import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RestaurantDishEntity } from './restaurants-dish.entity';
import { RestaurantAddressEntity } from './restaurant-address.entity';

@Entity('restaurant')
export class RestaurantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255, select: true })
  name: string;
  @Column({ type: 'varchar', length: 255, default: null })
  description: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(() => RestaurantDishEntity, (event) => event.dishes)
  restaurant: RestaurantDishEntity;

  @OneToOne(() => RestaurantAddressEntity)
  address: RestaurantAddressEntity;
}
