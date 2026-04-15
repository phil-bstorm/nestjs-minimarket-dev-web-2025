import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly _categoryRepo: Repository<CategoryEntity>,
  ) {}

  async create(category: Partial<CategoryEntity>) {
    // vérifier si le "name" n'existe pas déjà
    const existingName = await this._categoryRepo.findOne({
      where: { name: category.name },
    });

    if (existingName) {
      throw new Error('Category name already exists');
    }

    const newC = await this._categoryRepo.save(category);
    return newC;
  }

  async getAll(): Promise<{ data: CategoryEntity[]; total: number }> {
    const result = await this._categoryRepo.findAndCount();

    return {
      data: result[0],
      total: result[1],
    };
  }
}
