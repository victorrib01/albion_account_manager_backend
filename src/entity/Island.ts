import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import Building from "./Building";
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
    @JoinColumn({name: 'char_id'})
    char: Char

    @OneToMany(() => Building, b => b.island, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'building_id'})
    buildings: Building[]
}