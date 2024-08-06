import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto){
        const { userId, products } = order;
        return this.orderService.addOrder(userId, products);
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    getOrder(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.orderService.getOrder(id);
    }
}
