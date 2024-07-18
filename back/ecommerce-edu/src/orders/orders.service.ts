import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
    constructor(private ordersRepository: OrdersRepository){}

    // VALIDAR CON DTOS
    addOrder(userId: string, products: any){
        return this.ordersRepository.addOrder(userId, products);
    }

    getOrder(id: string){
        return this.ordersRepository.getOrder(id);
        // return this.getOrder(id); ??
    }
}
