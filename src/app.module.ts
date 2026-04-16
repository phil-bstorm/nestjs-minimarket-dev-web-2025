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
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Charger les variables du fichier .env
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    // Configuration du JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    // Connexion à la base de donnée
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
  controllers: [
    AppController,
    ProductController,
    CategoryController,
    AuthController,
  ],
  providers: [AppService, ProductService, CategoryService, UserService],
})
export class AppModule {}
