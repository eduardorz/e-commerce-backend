import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    getProducts(): string {
        return 'The service will return the products';
    }
}
