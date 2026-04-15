import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductListingQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  limit: number = 20;

  @IsNumber()
  @IsOptional()
  offset: number = 0;
}
