import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import BuildingType from "./BuildingType";
import DailyEarning from "./DailyEarning";
import Product from "./Product";
import Island from "./Island";

@Entity('constructions')
export default class Construction {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    tier: number

    @OneToMany(() => Product, p => p.construction,)
    products: Product[]

    @OneToMany(() => DailyEarning, dE => dE.construction, {
        cascade: ['insert', 'update','remove']
    })
    daily_earnings: DailyEarning[]

    @ManyToOne(() => BuildingType, b => b.constructions)
    @JoinColumn({name: 'building_id'})
    type: BuildingType

    @ManyToOne(()=> Island, island => island.constructions)
    island: Island
}