import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductListingQueryDto } from 'src/dtos/product.query.dto';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';

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

  async getAll(
    query: ProductListingQueryDto,
  ): Promise<{ data: ProductEntity[]; total: number }> {
    const where: FindOptionsWhere<ProductEntity> = {};

    if (query.name) {
      where.name = ILike(`%${query.name}%`);
    }

    const result = await this._productRepo.findAndCount({
      where,
      relations: {
        categories: true,
      },
      skip: query.offset,
      take: query.limit,
    });

    return {
      data: result[0],
      total: result[1],
    };
  }

  async getById(id: number): Promise<ProductEntity> {
    const product = await this._productRepo.findOne({
      where: {
        id,
      },
      relations: {
        categories: true,
      },
    });

    if (!product) {
      throw new Error('Produit introuvable');
    }

    return product;
  }
}
