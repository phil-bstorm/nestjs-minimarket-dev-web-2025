import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { CategoryController } from './controllers/category/category.controller';
import { CategoryService } from './services/category/category.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'minimarket',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      logging: true,
      entities: [ProductEntity, CategoryEntity],
    }),
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
  ],
  controllers: [AppController, ProductController, CategoryController],
  providers: [AppService, ProductService, CategoryService],
})
export class AppModule {}
