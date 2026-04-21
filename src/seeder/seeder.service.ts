import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../categories/entities/category.entity";
import { Repository, DataSource } from 'typeorm';
import { Product } from "../products/entities/product.entity";
import { categories } from "./data/categories";
import { products } from "./data/products";

// importamos repos para inyeccion masiva
@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository : Repository<Category>,
        @InjectRepository(Product) private readonly productRepository : Repository<Product>,
        private dataSource: DataSource
    ){}

    // limpiando la BD
    async onModuleInit() {
        const connection = this.dataSource
        await connection.dropDatabase()
        await connection.synchronize() // rec. entidades

    }
    

    async seed() {
        await this.categoryRepository.save(categories); //inject cat
        for await (const seedProduct of products) { //inject Prorduct(product+cat)
            const category = await this.categoryRepository.findOneBy({id: seedProduct.categoryId}) // traemos instancia/categoria
            if (!category) continue
            const product = new Product()
            product.name = seedProduct.name
            product.image = seedProduct.image
            product.price = seedProduct.price
            product.inventory = seedProduct.inventory
            product.category = category

            await this.productRepository.save(product)

        }


    }
        
}

// "onModuleInit()"--> modulo de ciclo de vida (nest), y se ejecuta por medio de "DataSource"
// await connection.synchronize() // regenera tablas y relaciones recuperando las entidades