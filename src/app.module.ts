import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { UserEntity } from './entities/user.entity';
import { AuthenticationMiddleware } from './middlewares/authentication/authentication.middleware';

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
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT!,
      database: process.env.PG_DATABASE,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      synchronize: true,
      logging: true,
      entities: [ProductEntity, CategoryEntity, UserEntity],
    }),
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, UserEntity]),
  ],
  controllers: [
    AppController,
    ProductController,
    CategoryController,
    AuthController,
  ],
  providers: [AppService, ProductService, CategoryService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
