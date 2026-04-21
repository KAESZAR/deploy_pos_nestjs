import { ConfigService } from "@nestjs/config"
import type { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { join } from "path"

export const typeOrmConfig = (configService: ConfigService) : TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'), // accediendo a variables de entorno
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASS'),
    database: configService.get('DATABASE_NAME'),
    ssl: true,
    logging: true,
    entities: [join(__dirname + '../../**/*.entity.{js,ts}')],//recurcividad para buscar entidades
    synchronize: true // solo utilizar en desarrollo
    
    //synchronize: configService.get('NODE_ENV') !== 'production' 
    //automaticamente deshabilitar synchronize en produccion. Tener NODE_ENV=production en tus variables de entorno del servidor.
})


// dependencias para variables de entorno: npm i @nestjs/config




