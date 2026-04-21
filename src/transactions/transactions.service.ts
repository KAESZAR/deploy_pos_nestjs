import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { CouponsService } from '../coupons/coupons.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents) private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly couponService: CouponsService 
  
  ) { }

  // manejamos "transaction" desde servidor
async create(createTransactionDto: CreateTransactionDto) {
  await this.productRepository.manager.transaction(async (transactionEntityManager) => {
    const transaction = new Transaction();
    const total = createTransactionDto.contents.reduce( (total, item) => total + (item.quantity * item.price) , 0 )
    transaction.total = total
   
    // transaccion de copón
    if(createTransactionDto.coupon) {
      const coupon = await this.couponService.applyCoupon(createTransactionDto.coupon)
      
      const discount = (coupon.percentage / 100) * total
      transaction.discount = discount
      transaction.coupon = coupon.name
      transaction.total -= discount
    }

    for (const contents of createTransactionDto.contents) {
      const product = await transactionEntityManager.findOneBy(Product, { id: contents.productId });

      const errors = []
      
      if (!product) {
        throw new BadRequestException(`El articulo con ID ${contents.productId} no fue encontrado`);
      }

      if (contents.quantity > product.inventory) {
        throw new BadRequestException(`El articulo ${product.name} excede la cantidad disponible`);
      }

      product.inventory -= contents.quantity;
      await transactionEntityManager.save(product); // Guardar producto con inventario actualizado

      const transactionContent = new TransactionContents();
      transactionContent.price = contents.price;
      transactionContent.product = product;
      transactionContent.quantity = contents.quantity;
      transactionContent.transaction = transaction;

      await transactionEntityManager.save(transaction); // Guardar la transacción para obtener su ID antes de guardar el contenido
      await transactionEntityManager.save(transactionContent); // Pasar la instancia directamente

    }
  });

  return {message:"Venta Almacenada Correctamente"}
}

findAll(transactionDate?: string) {
  const options : FindManyOptions<Transaction> = {
    relations: {
      contents: true
    }
  }
  if(transactionDate) {
    const date = parseISO(transactionDate)
    if(!isValid(date)) {
      throw new BadRequestException('Fecha no válida')
    }

    // Date, inicio y final del dia
    const start = startOfDay(date)
    const end = endOfDay(date)
    
    //filtrar por "transactionDate"
    options.where = {
      transactionDate: Between(start, end)
    }
  }

  return this.transactionRepository.find(options);
}

async findOne(id: number) {
  const transaction = await this.transactionRepository.findOne({
    where: {
      id
    },
    relations: {
      contents: true
    }
  })
  
  if(!transaction) {
    throw new NotFoundException('Transacción no encontrada')
  }

  return transaction;
}


async remove(id: number) {
  const transaction = await this.findOne(id)



  // restriccion de integridad referncial (BD)
  for(const contents of transaction.contents) {

    //regresar stock (reembolso)
    const product = await this.productRepository.findOneBy({id: contents.product.id})//instacia
    if (!product) {
      throw new NotFoundException(`Producto con ID ${contents.product.id} no encontrado`);
    }
    product.inventory += contents.quantity
    await this.productRepository.save(product)

    const transactionContents = await this.transactionContentsRepository.findOneBy({id: contents.id})
    if (transactionContents) {
      await this.transactionContentsRepository.remove(transactionContents)
    }
    
  }

  await this.transactionRepository.remove(transaction)

  return {message: 'Venta Eliminada'}
}

}

