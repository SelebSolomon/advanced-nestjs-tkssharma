import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Entity({ name: 'restaurant_dishes' })
@Index(['name'])
@Index(['category'])
@Index(['cuisineType'])
export class RestaurantDishEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  category?: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  foodType?: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  mealType?: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  cuisineType?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => RestaurantEntity, (event) => event.restaurant)
  @JoinColumn({ name: 'restaurant_id', referencedColumnName: 'id' })
  dishes: RestaurantEntity;
}
