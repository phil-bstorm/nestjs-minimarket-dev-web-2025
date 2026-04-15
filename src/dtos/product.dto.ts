import { CategoryDto } from './category.dto';

export class ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  categories: CategoryDto[];
}

export class ProductListingDto {
  id: number;
  name: string;
  price: number;
  categories: CategoryDto[];
}
