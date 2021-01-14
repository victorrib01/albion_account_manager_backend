import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Island from "./Island";

@Entity('island_types')
export default class IslandType {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @OneToMany(()=> Island, island => island.type)
    island: Island
}