import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CouponsModule } from './coupons/coupons.module';
import { UploadImageModule } from './upload-image/upload-image.module';



//se agregan archivos internamente 
@Module({
  imports: [ 
    ConfigModule.forRoot({ //globaliza las variables de entorno
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({ // bd conect
      useFactory: typeOrmConfig, // "useFactory", bd depende de datos dinamicos-acceso a variables de entorno desde "ConfigServices"
      inject: [ConfigService]
    }),
    CategoriesModule,
    ProductsModule,
    TransactionsModule,
    CouponsModule,
    UploadImageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
