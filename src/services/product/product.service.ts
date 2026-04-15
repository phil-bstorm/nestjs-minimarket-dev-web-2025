import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly _productRepo: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly _categoryRepo: Repository<CategoryEntity>,
  ) {}

  async create(
    product: Partial<ProductEntity>,
    categoriesIds: number[],
  ): Promise<ProductEntity> {
    // récupérer toutes les catégories
    const categories = await this._categoryRepo.find({
      where: {
        id: In(categoriesIds),
      },
    });

    // vérifier que tous les ids existent
    if (categories.length != categoriesIds.length) {
      throw new Error('Une catégorie est invalide');
    }

    // on ajoute les catégories au product
    product.categories = categories;

    // save le product
    const newP = this._productRepo.save(product);

    return newP;
  }
}
