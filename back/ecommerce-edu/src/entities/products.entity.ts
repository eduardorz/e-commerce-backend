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

@Entity({
    name: 'PRODUCTS',
})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false
    })
    description: string;
    
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;

    @Column({
        type: 'int',
        nullable: false
    })
    stock: number;

    @Column({
        type: 'text',
        // default: 'https://via.placeholder.com/150', url de la imagen*
    })
    imgUrl: string;


    //! Products (N:1) Categories
     @ManyToOne(() => Categories, (category) => category.products)
     @JoinColumn({name: 'category_id'})
     category: Categories;


    //! Products (N:N) OrderDetails
    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[]


    /* 
    @BeforeInsert()
    generateUuid() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
    
    */
}