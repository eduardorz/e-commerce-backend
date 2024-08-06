import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/entities/products.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

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
    getProductById(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.getProductByIdService(id);
    }

    @Put(':id')
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: Products){
        return this.productsService.updateProductService(id, product);
    }
    
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.deleteProductService(id);
    }
}
