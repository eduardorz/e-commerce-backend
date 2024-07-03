import { Injectable } from "@nestjs/common";

type Products = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: boolean;
    imageUrl: string;
}

@Injectable()
export class ProductsRepository {
    private products: Products[] = [
        {
            id: "1",
            name: "Producto 1",
            description: "Descripción del producto 1",
            price: 10.99,
            stock: true,
            imageUrl: "https://example.com/product1.jpg"
        },
        {
            id: "2",
            name: "Producto 2",
            description: "Descripción del producto 2",
            price: 19.99,
            stock: false,
            imageUrl: "https://example.com/product2.jpg"
        },
        {
            id: "3",
            name: "Producto 3",
            description: "Descripción del producto 3",
            price: 29.99,
            stock: true,
            imageUrl: "https://example.com/product3.jpg"
        },
        {
            id: "4",
            name: "Producto 4",
            description: "Descripción del producto 4",
            price: 9.99,
            stock: true,
            imageUrl: "https://example.com/product4.jpg"
        },
        {
            id: "5",
            name: "Producto 5",
            description: "Descripción del producto 5",
            price: 14.99,
            stock: false,
            imageUrl: "https://example.com/product5.jpg"
        }
    ];

    getProductsRepository() {
        return this.products;
    }
}