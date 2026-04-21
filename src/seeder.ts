// Insertar de forma masiva datos a nuestra BD conectandose a typeorm
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);
  const seeder = app.get(SeederService)
  await seeder.seed()
  await app.close()
}
bootstrap();


// crear módulo:"nest g mo seeder"



