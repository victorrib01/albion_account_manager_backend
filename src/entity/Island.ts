import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import Char from "./Char";


@Entity('islands')
export default class Island {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    level: number

    @Column()
    daily_earnings: number

    @Column()
    active: boolean

    @OneToOne(() => Char, char => char.island)
    @JoinColumn({name: 'island_id'})
    char: Char
}