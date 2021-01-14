import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";
import Construction from "./Construction";
import DailyCost from "./DailyCost";

@Entity('products')
export default class Product {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string
    
    @Column()
    est_value: number

    @Column()
    tier: number

    @ManyToOne(() => Construction, c => c.products)
    @JoinColumn({name: 'construction_id'})
    construction: Construction

    @ManyToMany(() => DailyCost, dc => dc.products)
    daily_costs: DailyCost[]
}