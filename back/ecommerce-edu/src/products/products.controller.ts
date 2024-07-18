import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.interface';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { Products } from 'src/entities/products.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get()
    getProducts(@Query('page') page: string, @Query('limit') limit: string){
        return this.productsService.getProductsService(Number(page), Number(limit));
    }

    @Get('seeder')
    addProduct() { 
        return this.productsService.addProductService();
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductByIdService(id);
    }

    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() product: Products){
        return this.productsService.updateProductService(id, product);
    }
    

    /*
    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productsService.deleteProductService(id);
    }
    */
}
