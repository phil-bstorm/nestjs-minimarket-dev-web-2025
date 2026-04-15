import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  categoriesId: number[];
}

export class ProductUpdateDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price: number;
}
