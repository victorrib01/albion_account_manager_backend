import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import Island from "./Island";
import Product from "./Product";

@Entity('daily_costs')
export default class DailyCost {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn()
    created_at: Date

    @Column()
    value: number

    @ManyToOne(()=> Island, island => island.daily_costs, {nullable: true})
    @JoinColumn({name: 'island_id'})
    island: Island

    @ManyToOne(()=> Product, product => product.daily_costs, {nullable: true})
    @JoinColumn({name: 'product_id'})
    products: Product[];

}