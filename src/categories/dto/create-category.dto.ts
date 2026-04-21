import { IsNotEmpty } from "class-validator"

export class CreateCategoryDto {
    @IsNotEmpty({message: 'El Nombre de la Categoria no puede ir vacio'})
    name: string
}
