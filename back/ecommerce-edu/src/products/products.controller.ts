import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/entities/products.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('products')
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
    @UseGuards(AuthGuard)
    updateProduct(@Param('id') id: string, @Body() product: Products){
        return this.productsService.updateProductService(id, product);
    }
    
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProductService(id);
    }
}
