import { ProductDto, ProductListingDto } from 'src/dtos/product.dto';
import { ProductEntity } from 'src/entities/product.entity';
import { categoryEntityToDto } from './cateogry.mapper';
import { ProductCreateDto, ProductUpdateDto } from 'src/dtos/product.form.dto';

export function productEntityToDetailsDto(entity: ProductEntity): ProductDto {
  const dto = new ProductDto();
  dto.id = entity.id;
  dto.name = entity.name;
  dto.description = entity.description;
  dto.price = entity.price;
  dto.categories = entity.categories.map(categoryEntityToDto); // on transfome les CategoryEntity en CategoryDto
  //   dto.categories = entity.categories.map((c) => {
  //     return CategoryEntityToDto(c);
  //   });

  return dto;
}

export function productEntityToListingDto(
  entity: ProductEntity,
): ProductListingDto {
  const dto = new ProductListingDto();

  dto.id = entity.id;
  dto.name = entity.name;
  dto.price = entity.price;
  dto.categories = entity.categories.map(categoryEntityToDto);

  return dto;
}

// Create -> Entity
export function productCreateDtoToEntity(
  dto: ProductCreateDto,
): Partial<ProductEntity> {
  const entity = new ProductEntity();

  entity.name = dto.name;
  entity.description = dto.description;
  entity.price = dto.price;

  return entity;
}

// Update -> Entity
export function productUpdateDtoToEntity(
  dto: ProductUpdateDto,
): Partial<ProductEntity> {
  const entity = new ProductEntity();

  entity.name = dto.name;
  entity.description = dto.description;
  entity.price = dto.price;

  return entity;
}
