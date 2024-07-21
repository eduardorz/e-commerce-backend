import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/orderdetails.entity";
import { Orders } from "src/entities/orders.entity";
import { Products } from "src/entities/products.entity";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
    ) {}

    async addOrder(userId: string, products: any){
        let total = 0;

        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) throw new NotFoundException(`Usuario con el id ${userId} no encontrado`);

        const order = new Orders();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

        // asociamos cada id recibido con el producto
        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({
                    id: element.id,
                });
                if (!product) return `Producto con el id ${element.id} no encontrado`;

                // monto total
                total += Number(product.price);

                // actualizacion stock
                // FALTA VALIDAR QUE EL STOCK NO SEA CERO
                await this.productsRepository.update(
                    { id: element.id},
                    { stock: product.stock - 1},
                );

                return product;
            }),
        );

        // creacion del orderDetail, ingreso en bd
        const orderDetail = new OrderDetails();

        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;
        await this.orderDetailsRepository.save(orderDetail);

        // presentamos al cliente el detalle de la compra
        return await this.ordersRepository.find({
            where: { id: newOrder.id },
            relations: {
                orderDetails: true,
            },
        });
    }

    getOrder(id: string) {
        const order = this.ordersRepository.findOne({
            where: { id },
            relations: {
                orderDetails: {
                    products: true,
                },
            },
        });

        if(!order) return `Orden con el id ${id} no encontrada`;
        return order;
    }

}