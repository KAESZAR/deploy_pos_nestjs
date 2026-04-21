import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor( // permite estar diponible para typeorm
    @InjectRepository(Category) private readonly categoryRepository : Repository<Category>

  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    
    return this.categoryRepository.save(createCategoryDto); // se almacena en BD
  }
    

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number, products?: string) {

    const options : FindManyOptions<Category> = {
      where: {
        id
      }
    }

    if(products === "true") { // strict/end point
      options.relations = {
        products: true
      },
      options.order = {
        products: {
          id:'DESC'
        }
      }
    }
    // se manda a llamar a BD
    const category = await this.categoryRepository.findOne(options) 
      if(!category) {
        throw new NotFoundException('La categoria no existe')
      }
      return category
    }
  
      

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id)
    category.name = updateCategoryDto.name //update
    return await this.categoryRepository.save(category)
  }

  async remove(id: number) {
    const category = await this.findOne(id)
    await this.categoryRepository.remove(category)
    return "Categoría Eliminada";
  }
}
