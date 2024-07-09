import { Injectable } from "@nestjs/common";
import { Product } from "./product.interface";

@Injectable()
export class ProductsRepository {
    private products: Product[] = [
        {
            id: 1,
            name: "Producto 1",
            description: "Descripción del producto 1",
            price: 10.99,
            stock: true,
            imageUrl: "https://example.com/product1.jpg"
        },
        {
            id: 2,
            name: "Producto 2",
            description: "Descripción del producto 2",
            price: 19.99,
            stock: false,
            imageUrl: "https://example.com/product2.jpg"
        },
        {
            id: 3,
            name: "Producto 3",
            description: "Descripción del producto 3",
            price: 29.99,
            stock: true,
            imageUrl: "https://example.com/product3.jpg"
        },
        {
            id: 4,
            name: "Producto 4",
            description: "Descripción del producto 4",
            price: 9.99,
            stock: true,
            imageUrl: "https://example.com/product4.jpg"
        },
        {
            id: 5,
            name: "Producto 5",
            description: "Descripción del producto 5",
            price: 14.99,
            stock: false,
            imageUrl: "https://example.com/product5.jpg"
        }
    ];

    async getProductsRepository() {
        return this.products;
    }

    async getProductByIdRepository(id: number) {
        const product = this.products.find((product) => Number(product.id) === Number(id));
        if(!product) return  `No se encontro el producto con el id ${id}`;
        return product;
    }

    async addProductRepository(product: Omit<Product, 'id'>) {
        const id = this.products.length + 1;
        this.products = [ ... this.products, { id, ... product}];
        return { id, ... product};
    }

    async updateProductRepository(id: number, product: Product) {
        const foundIndex = this.products.findIndex(product => Number(product.id) === Number(id));
        if(foundIndex === -1) {
            return  `No se encontro el producto con el id ${id}`;
        } 
        this.products[foundIndex] = {...this.products[foundIndex], ...product};
        return this.products[foundIndex]; 
    }

    async deleteProductRepository(id: number) {
        const foundIndex = this.products.findIndex(product => Number(product.id) === Number(id));
        if(foundIndex === -1) return  `No se encontro el producto con el id ${id}`;
        this.products.splice(foundIndex, 1);
        return `El producto con el id ${id} ha sido eliminado`;
    }
}