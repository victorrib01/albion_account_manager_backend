import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import Account from "./Account";
import Island from "./Island";


@Entity('chars')
export default class Char {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nickname: string

    @Column()
    premium: boolean

    @Column()
    first_premium: boolean

    @Column()
    silver: number

    @OneToOne(() => Island, island => island.char)
    @JoinColumn({name: 'island_id'})
    island: Island

    @ManyToOne(() => Account, account => account.chars)
    @JoinColumn({name: 'char_id'})
    account: Account;
}