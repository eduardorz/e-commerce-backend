import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}

    @Post()
    addOrder(@Body() order: CreateOrderDto){
        const { userId, products } = order;
        return this.orderService.addOrder(userId, products);
    }

    @Get(':id')
    getOrder(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.orderService.getOrder(id);
    }
}
