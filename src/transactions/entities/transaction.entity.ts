import { Product } from '../../products/entities/product.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
  id: number 

    @Column('decimal')
  total: number

    @Column({type: 'varchar', length: 30, nullable: true}) // coupon
    coupon: string

    @Column({type: 'decimal', nullable: true, default: 0}) // coupon
    discount: number

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)"}) //almacena la fecha en la que se genera ese registro
    transactionDate!: Date

    @OneToMany(() => TransactionContents, (Transaction) => Transaction.transaction)// JOIN
    contents: TransactionContents[]
  
}

@Entity()
export class TransactionContents {
    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    quantity: number

    @Column('decimal')
    price: number

    //relacion con producto --> "eager"
    @ManyToOne(() => Product, (Product) => Product.id, {eager: true, cascade: true})
    product: Product

    //obtenemos el contenido
    @ManyToOne(() => Transaction, (Transaction) => Transaction.contents, {cascade: true})
    transaction: Transaction 
}




// crear archivo: "nest g res transactions"