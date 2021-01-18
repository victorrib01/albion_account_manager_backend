import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import Char from "./Char";
import User from "./User";

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
    chars: Char[]
    
    @ManyToOne(() => User, user => user.accounts, {
        cascade: ['insert', 'update']
    })
    user: User
}