import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Char from "./Char";


@Entity('accounts')
export default class Account {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Char, char => char.account, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'char_id'})
    chars: Char[]
}