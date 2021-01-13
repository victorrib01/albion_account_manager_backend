import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
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
    @JoinColumn({name: 'char_id'})
    chars: Char[]
    
    @ManyToOne(() => User, user => user.accounts, {
        cascade: ['insert', 'update']
    })
    user: User
}