import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Construction from "./Construction";
import Island from "./Island";

@Entity('building_types')
export default class Building {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string
    
    @OneToMany(() => Construction, c => c.type)
    constructions: Construction[]

}