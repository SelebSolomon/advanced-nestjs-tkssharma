import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Entity('restaurant_addresses')
export class RestaurantAddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255, select: true })
  city: string;
  @Column({ type: 'varchar', length: 255, default: null })
  state: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @OneToOne(() => RestaurantEntity)
  @JoinColumn({ name: 'restaurant_id', referencedColumnName: 'id' })
  address: RestaurantEntity;
}
