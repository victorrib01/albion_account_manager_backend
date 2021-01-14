import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Account from "./Account";


@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    admin: boolean

    @OneToMany(() => Account, account => account.user, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'account_id'})
    accounts: Account[]
}