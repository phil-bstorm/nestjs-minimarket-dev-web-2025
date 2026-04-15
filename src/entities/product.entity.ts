import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'numeric', precision: 9, scale: 2 })
  price: number;

  // category Many to Many
  @ManyToMany(() => CategoryEntity, (c) => c.products)
  @JoinTable({ name: 'product_category' })
  categories: CategoryEntity[];
}
