import { Product } from '../../products/entities/product.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Category { 
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 60})
    name: string

    // InversSide
    @OneToMany(() => Product, (product) => product.category, {cascade: true})
    products: Product[]
}

// "{cascade: true}"--> asigna automaticamente a la categoria
// @Entity()
//export class Category extends BaseEntity { // se activa "Active Record"