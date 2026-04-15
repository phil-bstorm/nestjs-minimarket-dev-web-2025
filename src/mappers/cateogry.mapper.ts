import { CategoryDto } from 'src/dtos/category.dto';
import {
  CategoryCreateDto,
  CategoryUpdateDto,
} from 'src/dtos/category.form.dto';
import { CategoryEntity } from 'src/entities/category.entity';

// Entity -> Dto
export function CategoryEntityToDto(entity: CategoryEntity): CategoryDto {
  const dto = new CategoryDto();
  dto.id = entity.id;
  dto.name = entity.name;

  return dto;
}

// CreateDto -> Entity
export function CategoryCreateDtoToEntity(
  dto: CategoryCreateDto,
): Partial<CategoryEntity> {
  const entity = new CategoryEntity();

  entity.name = dto.name;

  return entity;
}

// UpdateDto -> Entity
export function CategoryUpdateDtoToEntity(
  dto: CategoryUpdateDto,
): Partial<CategoryEntity> {
  const entity = new CategoryEntity();

  entity.name = dto.name;

  return entity;
}
