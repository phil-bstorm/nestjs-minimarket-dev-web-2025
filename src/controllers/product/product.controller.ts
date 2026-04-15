import { Body, Controller, Post } from '@nestjs/common';
import { ProductDto } from 'src/dtos/product.dto';
import { ProductCreateDto } from 'src/dtos/product.form.dto';
import {
  productCreateDtoToEntity,
  productEntityToDetailsDto,
} from 'src/mappers/product.mapper';
import { ProductService } from 'src/services/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Post()
  async create(@Body() body: ProductCreateDto): Promise<{ data: ProductDto }> {
    const newEntity = await this._productService.create(
      productCreateDtoToEntity(body), // transformation du dto en entité
      body.categoriesId,
    );

    const productDto = productEntityToDetailsDto(newEntity);
    return { data: productDto };
  }
}
