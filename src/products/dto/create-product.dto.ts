import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty({ message: 'El Nombre del Producto es Obligatorio' })
    @IsString({ message: 'Nombre no Válido' })
    name: string

    @IsNotEmpty({ message: 'La imagen del Producto es Obligatorio' })
    image: string

    @IsNotEmpty({ message: 'El Precio del Producto es Obligatorio' })
    @IsNumber({maxDecimalPlaces: 2}, {message: 'Precio no válido'})
    price: number

    @IsNotEmpty({ message: 'La cantidad es obligatoria' })
    @IsNumber({maxDecimalPlaces: 0}, {message: 'Cantidad no valida'})
    inventory: number

    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    @IsInt({message: 'La categoría no es valida'})
    categoryId: number
}
