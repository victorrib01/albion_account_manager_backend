import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import Char from "./Char";
import IslandType from "./IslandType";
import DailyEarning from "./DailyEarning";
import Construction from "./Construction";
import DailyCost from "./DailyCost";
import Location from "./Location";

@Entity('islands')
export default class Island {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    level: number

    @Column()
    active: boolean

    @OneToMany(() => DailyEarning, dE => dE.island, {
        cascade: ['insert', 'update','remove']
    })
    daily_earnings: DailyEarning[]

    @OneToMany(() => DailyCost, dc => dc.island, {
        cascade: ['insert', 'update','remove']
    })
    daily_costs: DailyCost[]

    @OneToMany(() => Construction, c => c.island, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'building_id'})
    constructions: Construction[]

    @ManyToOne(()=> IslandType, islandType => islandType.id)
    @JoinColumn({name: 'island_type_id'})
    type: IslandType

    @ManyToOne(()=> Location, location => location.id)
    @JoinColumn({name: 'island_location_id'})
    location: Location

    @OneToOne(() => Char, char => char.island)
    @JoinColumn({name: 'char_id'})
    char: Char

}