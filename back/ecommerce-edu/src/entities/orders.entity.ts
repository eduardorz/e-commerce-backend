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


@Entity({
    name: 'ORDERS',
})
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    //! Orders (1:1) OrderDetails
    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails;

    //! Orders (N:1) Users
    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: Users;


    /*
    @BeforeInsert()
    generateUuid() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
    
    */

}