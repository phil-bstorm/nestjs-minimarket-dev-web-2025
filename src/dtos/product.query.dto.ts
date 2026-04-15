import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductListingQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number = 20;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  offset: number = 0;
}
