import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  // RELATIONS
  @ManyToMany(() => ProductEntity, (p) => p.categories)
  @JoinTable({ name: 'product_category' })
  products: ProductEntity[];
}
