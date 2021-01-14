import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import Construction from "./Construction";
import Island from "./Island";

@Entity('daily_earnings')
export default class DailyEarning {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn()
    created_at: Date

    @Column()
    value: number

    @ManyToOne(() => Construction, c => c.daily_earnings , {nullable: true})
    @JoinColumn({name: 'construction_id'})
    construction: Construction

    @ManyToOne(()=> Island, island => island.daily_earnings, {nullable: true})
    @JoinColumn({name: 'island_id'})
    island: Island

}