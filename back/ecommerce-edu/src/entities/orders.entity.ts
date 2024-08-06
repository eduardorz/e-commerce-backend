import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";

import { Users } from "./users.entity";
import { OrderDetails } from "./orderdetails.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({
    name: 'ORDERS',
})
export class Orders {
    @ApiProperty({
        description: 'uuid v4 generado en base de datos'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Debe ser una fecha válida con formato dd/mm/yyyy',
        example: '01/06/2024'
    })
    @Column()
    date: Date;

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails;

    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: Users;
}