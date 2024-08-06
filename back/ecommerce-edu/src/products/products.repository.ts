import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
        if(!product) throw new NotFoundException(`No se encontro el producto con el id ${id}`);
        return product;
    }

    async addProductRepository() {
        const categories = await this.categoriesRepository.find();
        const categoriesCount = await this.categoriesRepository.count();
        if (categoriesCount === 0) throw new BadRequestException('No se encontraron categorias. Por favor, cargar categorias primero.');
        
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
                .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                .execute();
        });
        return 'Productos agregados';
    }

    async updateProductRepository(id: string, product: Products) {
        const productFinded = await this.productsRepository.findOneBy({ id });
        if(!productFinded) throw new NotFoundException(`No se encontró el producto con el id ${id}`);
        await this.productsRepository.update(id, product);
        const updatedProduct = await this.productsRepository.findOneBy({
            id,
        });
        return updatedProduct;
    }

    async deleteProductRepository(id: string) {
        const product = await this.productsRepository.findOneBy({ id });
        if(!product) throw new NotFoundException(`No se encontró el producto con el id ${id}`);
        await this.productsRepository.delete(id);
        return { message: `Producto con el id ${id} eliminado exitosamente` };
    }
}