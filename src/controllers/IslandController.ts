import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Island from '../entity/Island';

import Char from '../entity/Char';
import IslandType from '../entity/IslandType';
import Location from '../entity/Location'

export default {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const islandsRepository = getRepository(Island);

        const islands = await islandsRepository.findOneOrFail(id, {
            relations: [
                'char',
                'daily_earnings',
                'buildings',
                'type'
            ]
        })

        return res.json(islands);
    },

    async index(req: Request, res: Response) {
        const islandsRepository = getRepository(Island);

        const islands = await islandsRepository.find({
            relations: [
                'daily_earnings',
                'daily_costs',
                'constructions',
                'type',
                'location',
                'char',
            ]
        })

        return res.json(islands);
    },

    async create(req: Request, res: Response) {
        const {
            level,
            active,
            island_type_id,
            char_id,
            location_id,
        } = req.body

        const islandsRepository = getRepository(Island);
        
        const islandTypeRepository = getRepository(IslandType);
        const type = await islandTypeRepository.findOneOrFail(island_type_id)
        
        const locationsRepository = getRepository(Location)
        const location = await locationsRepository.findOneOrFail(location_id)

        const charsRepository = getRepository(Char)
        const char = await charsRepository.findOneOrFail(char_id)


        const data = {
            level,
            active,
            type,
            location,
            char,
        }

        const island = islandsRepository.create(data);

        await islandsRepository.save(island);

        return res.status(201).json(island);
    },

    async update(req: Request, res: Response){
        const { id } = req.params

        const island = await getRepository(Island).update(id, req.body)

        if(island.affected === 1) {
            const islandUpdated = await getRepository(Island).findOne(id)
            return res.json(islandUpdated)
        }

        res.json(island)
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const island = await getRepository(Island).delete(id)

        if (island.affected === 1) {
            const islandRemoved = await getRepository(Island).findOne(id)
            return res.json({message: "Island removed", islandRemoved})
        }

        return res.status(404).json({message: "Island not found" })
    },

}