import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import Building from "./Building";
import Char from "./Char";
import Construction from "./Construction";


@Entity('products')
export default class Product {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    tier: number

    @Column()
    est_value: number

    @ManyToOne(() => Construction, c => c.products)
    @JoinColumn({name: 'construction_id'})
    construction: Construction

}