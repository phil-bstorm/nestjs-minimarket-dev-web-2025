import { IsOptional, IsString, MinLength } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  @MinLength(2)
  name: string;
}

export class CategoryUpdateDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  name: string;
}
