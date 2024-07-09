import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    getProductsService() {
        return this.productsRepository.getProductsRepository();
    }
    
    getProductByIdService(id: number) {
        return this.productsRepository.getProductByIdRepository(id);
    }

    addProductService(product: Product) {
        return this.productsRepository.addProductRepository(product);
    }

    updateProductService(id: number, product: Product) {
        return this.productsRepository.updateProductRepository(id, product);
    }

    deleteProductService(id: number) {
        return this.productsRepository.deleteProductRepository(id);
    }
}
