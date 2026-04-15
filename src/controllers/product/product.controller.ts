import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProductDto, ProductListingDto } from 'src/dtos/product.dto';
import { ProductCreateDto } from 'src/dtos/product.form.dto';
import { ProductListingQueryDto } from 'src/dtos/product.query.dto';
import {
  productCreateDtoToEntity,
  productEntityToDetailsDto,
  productEntityToListingDto,
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

  @Get()
  async getAll(
    @Query() query: ProductListingQueryDto,
  ): Promise<{ data: ProductListingDto[]; total: number }> {
    const result = await this._productService.getAll(query);
    const dto = result.data.map(productEntityToListingDto);
    return {
      data: dto,
      total: result.total,
    };
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: ProductDto }> {
    const product = await this._productService.getById(id);
    const dto = productEntityToDetailsDto(product);
    return { data: dto };
  }
}
