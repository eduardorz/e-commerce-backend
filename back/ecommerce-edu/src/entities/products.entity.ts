import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";

import { OrderDetails } from "./orderdetails.entity";
import { Categories } from "./categories.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'PRODUCTS',
})
export class Products {
    @ApiProperty({
        description: 'uuid v4 generado en base de datos'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Nombre del producto (máximo 50 caracteres)',
        example: 'Apple iPhone 18'
    })
    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    name: string;

    @ApiProperty({
        description: 'Descripción del producto',
        example: 'El teléfono más avanzado del mercado.'
    })
    @Column({
        type: 'text',
        nullable: false
    })
    description: string;
    
    @ApiProperty({
        description: 'Precio del producto',
        example: 2000.00
    })
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;

    @ApiProperty({
        description: 'Stock del producto',
        example: 50
    })
    @Column({
        type: 'int',
        nullable: false
    })
    stock: number;

    @ApiProperty({
        description: 'Imagen del producto en formato .jpg|.jpeg|.png|.webp'
    })
    @Column({
        type: 'text',
        default: 'https://via.placeholder.com/150',
    })
    imgUrl: string;

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({name: 'category_id'})
    category: Categories;

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[]
}