import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly catogoryRepository: Repository<Category>
  ) { }

  // verificamos si un producto existe o no
  async create(createProductDto: CreateProductDto) {
    const category = await this.catogoryRepository.findOneBy({ id: createProductDto.categoryId })

    if (!category) {
      let errors: string[] = []
      errors.push('La Categoría no existe')
      throw new NotFoundException(errors)
    }

    //almacenamiento y asignacion de categoria automática
    return this.productRepository.save({
      ...createProductDto,
      category
    })

  }

  async findAll(categoryId: number | undefined, take: number, skip: number) {

    //agrgar opciones
    const options: FindManyOptions<Product> = {
      relations: {
        category: true
      },
      order: {
        id: 'DESC'
      },
      take,// páginacion "Limit"
      skip//ignora el último y muestra el siguiente
    }

    //agregar condiciones
    if (categoryId) {
      options.where = {
        category: {
          id: categoryId
        }
      }
    }

    const [products, total] = await this.productRepository.findAndCount(options)

    return {
        products,
        total
      }
    }


    async findOne(id: number) {
      const product = await this.productRepository.findOne({
        where: {
          id
        },
        relations: {
          category: true
        }
      })
      
      if(!product) {
        throw new NotFoundException(`El producto con el ID: ${id} no fue encontrado`)
      }

      return product
    }
    
    //si existe, actualizar
    async update(id: number, updateProductDto: UpdateProductDto) {
      const product = await this.findOne(id)
      Object.assign(product, updateProductDto) // arg

      if(updateProductDto.categoryId) {

        const category = await this.catogoryRepository.findOneBy({ id: updateProductDto.categoryId })

      if (!category) {
        let errors: string[] = []
        errors.push('La Categoría no existe')
        throw new NotFoundException(errors) 

      }
      product.category = category // instancia de objeto
    }

      return await this.productRepository.save(product);
    }

    async remove(id: number) {
      const product = await this.findOne(id)
      await this.productRepository.remove(product)

      return {message: "Producto Eliminado"};
    }
  }

