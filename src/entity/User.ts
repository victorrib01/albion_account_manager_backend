import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import Account from "./Account";
import bcrypt from 'bcryptjs';


@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    hashedPassword() {
        this.password = bcrypt.hashSync(this.password, 12)
    }

    @Column()
    admin: boolean

    @OneToMany(() => Account, account => account.user, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'account_id'})
    accounts: Account[]
}