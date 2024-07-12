import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";

import { Products } from "./products.entity";

@Entity({
    name: 'CATEGORIES',
})
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        // nullable: false,
        unique: true,
    })
    name: string;

    //! Categories (1:N) Products

    @OneToMany(() => Products, (product) => product.category)
    @JoinColumn()
    products: Products[];
    

    /* 
    @BeforeInsert()
    generateUuid() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
    
    */
}