import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import Building from "./Building";
import Product from "./Product";


@Entity('constructions')
export default class Construction {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    tier: number

    @Column()
    est_earnings: number

    @OneToMany(() => Product, p => p.construction, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'product_id'})
    products: Product[]

    @OneToOne(() => Building, b => b.construction)
    @JoinColumn({name: 'construction_id'})
    building: Building
}