import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.interface';
import { Products } from 'src/entities/products.entity';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    getProductsService(page: number, limit: number) {
        return this.productsRepository.getProductsRepository(page, limit);
    }
    
    getProductByIdService(id: string) {
        return this.productsRepository.getProductByIdRepository(id);
    }

    addProductService() {
        return this.productsRepository.addProductRepository();
    }

    updateProductService(id: string, product: Products) {
        return this.productsRepository.updateProductRepository(id, product);
    }

    deleteProductService(id: string) {
        return this.productsRepository.deleteProductRepository(id);
    }
}
