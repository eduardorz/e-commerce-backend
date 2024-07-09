import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.interface';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get()
    getProducts(){
        return this.productsService.getProductsService();
    }

    @Get(':id')
    getProductById(@Param('id') id: number) {
        return this.productsService.getProductByIdService(id);
    }

    @Post()
    @UseInterceptors(DateAdderInterceptor)
    addProduct(@Body() product: Product, @Req() request: Request & { now: string }) { 
        return this.productsService.addProductService(product);
    }

    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() product: Product){
        return this.productsService.updateProductService(id, product);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productsService.deleteProductService(id);
    }
}
