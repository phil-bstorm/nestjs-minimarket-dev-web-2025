import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryDto } from 'src/dtos/category.dto';
import { CategoryCreateDto } from 'src/dtos/category.form.dto';
import {
  categoryCreateDtoToEntity,
  categoryEntityToDto,
} from 'src/mappers/cateogry.mapper';
import { CategoryService } from 'src/services/category/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() body: CategoryCreateDto,
  ): Promise<{ data: CategoryDto }> {
    const newCategory = await this._categoryService.create(
      categoryCreateDtoToEntity(body),
    );

    const dto = categoryEntityToDto(newCategory);
    return { data: dto };
  }

  @Get()
  async getAll(): Promise<{ data: CategoryDto[]; total: number }> {
    const result = await this._categoryService.getAll();
    const dto = result.data.map(categoryEntityToDto);
    return {
      data: dto,
      total: result.total,
    };
  }
}
