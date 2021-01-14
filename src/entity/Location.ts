import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Island from "./Island";

@Entity('locations')
export default class IslandType {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @OneToMany(()=> Island, island => island.location)
    island: Island
}