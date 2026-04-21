import { IsNumberString, IsOptional } from "class-validator";

export class GetProductQueryDto {
    @IsOptional()
    @IsNumberString({}, {message: 'La categoría debe ser un número'})
    category_id: number
    
    @IsOptional()
    @IsNumberString({}, {message: 'La cantidad debe ser un numero'})
    take: number

    @IsOptional()
    @IsNumberString({}, {message: 'La cantidad debe ser un numero'})
    skip: number
}

//parámetros para la URL