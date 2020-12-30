import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import Construction from "./Construction";
import Island from "./Island";

@Entity('buildings')
export default class Building {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    tier?: number

    @Column()
    daily_earnings: number
    
    @ManyToOne(()=> Island, island => island.buildings)
    @JoinColumn({name: 'building_id'})
    island: Island
    
    @OneToOne(() => Construction, c => c.building)
    @JoinColumn({name: 'construction_id'})
    construction: Construction

}