import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';

@Module({
   imports: [ 
        ConfigModule.forRoot({ //globaliza las variables de entorno
          isGlobal: true
        }),
        TypeOrmModule.forRootAsync({ // bd conect
          useFactory: typeOrmConfig, // "useFactory", bd depende de datos dinamicos-acceso a variables de entorno desde "ConfigServices"
          inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([Product, Category])
    ],
    providers:  [SeederService]
})
export class SeederModule {}
          
