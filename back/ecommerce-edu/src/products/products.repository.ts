import { Injectable } from "@nestjs/common";
import { Product } from "./product.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { Categories } from "src/entities/categories.entity";
import * as data from '../utils/data.json';
import { Repository } from "typeorm";

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
        @InjectRepository(Categories)
        private categoriesRepository: Repository<Categories>,
    ) {}

    async getProductsRepository(page: number, limit: number): Promise<Products[]> {
        let products = await this.productsRepository.find({
            relations: {
                category: true,
            },
        });
        const start = (page - 1) * limit;
        const end = start + limit;
        products = products.slice(start, end);

        return products;
    }

    async getProductByIdRepository(id: string) {
        const product = await this.productsRepository.findOneBy({ id });
        if(!product) return  `No se encontro el producto con el id ${id}`;
        return product;
    }

    // QUEDA VALIDAR QUE YA EXISTAN LAS CATEGORIAS ANTES DE AGREGAR PRODUCTOS

    async addProductRepository() {
        const categories = await this.categoriesRepository.find();
        data?.map(async (element) => {

            const category = categories.find(
                (category) => category.name === element.category,
            );

            const product = new Products();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.imgUrl = element.imgUrl;
            product.stock = element.stock;
            product.category = category;

            await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(Products)
                .values(product)
                // si el producto ya existe, se actualiza
                .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                .execute();
        });
        return 'Productos agregados';
    }

    async updateProductRepository(id: string, product: Products) {
        await this.productsRepository.update(id, product);
        const updatedProduct = await this.productsRepository.findOneBy({
            id,
        });
        return updatedProduct;
    }

    /*
    async deleteProductRepository(id: number) {
        const foundIndex = this.products.findIndex(product => Number(product.id) === Number(id));
        if(foundIndex === -1) return  `No se encontro el producto con el id ${id}`;
        this.products.splice(foundIndex, 1);
        return `El producto con el id ${id} ha sido eliminado`;
    }

    */
    
}