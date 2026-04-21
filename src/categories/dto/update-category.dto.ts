import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty } from 'class-validator';


// actualizaciones parciales
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { 
    @IsNotEmpty({message: 'El Nombre de la Categoria no puede ir vacio'})
    name: string
} 
