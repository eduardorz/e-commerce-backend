import { 
    BeforeInsert,
    Column, 
    Entity,
    JoinColumn,
    OneToMany, 
    PrimaryColumn, 
    PrimaryGeneratedColumn
 } from "typeorm";
import { Orders } from "./orders.entity";


@Entity({
    name: 'USERS',
})
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 128,
        nullable: false,
    })
    password: string;

    @Column({
        type: 'int',
    })
    phone: number;

    @Column({
        type: 'varchar',
        length: 50,
    })
    country: string;

    @Column({
        type: 'text',
    })
    address: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    city: string;

    @Column({
        default: false,
    })
    isAdmin: boolean;

    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({ name: 'user_id' })
    orders: Orders[];
}