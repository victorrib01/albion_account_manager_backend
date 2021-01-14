import { Request, Response } from 'express';
import IslandType from '../entity/IslandType';

import { getRepository } from 'typeorm';
import Island from '../entity/Island';

export default {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const islandTypesRepository = getRepository(IslandType);

        const islandTypes = await islandTypesRepository.findOneOrFail(id, {
            relations: ['island']
        })

        return res.json(islandTypes);
    },

    async index(req: Request, res: Response) {
        const islandTypesRepository = getRepository(IslandType);

        const islandTypes = await islandTypesRepository.find({
            relations: ['island']
        })

        return res.json(islandTypes);
    },

    async create(req: Request, res: Response) {
        const {
            name
        } = req.body

        const islandTypesRepository = getRepository(IslandType);

        const data = {
            name
        }

        const building = islandTypesRepository.create(data);

        await islandTypesRepository.save(building);

        return res.status(201).json(building);
    },

    async update(req: Request, res: Response){
        const { id } = req.params

        const building = await getRepository(IslandType).update(id, req.body)

        if(building.affected === 1) {
            const accountUpdated = await getRepository(IslandType).findOne(id)
            return res.json(accountUpdated)
        }

        res.json(building)
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const building = await getRepository(IslandType).delete(id)

        if (building.affected === 1) {
            const accountRemoved = await getRepository(IslandType).findOne(id)
            return res.json({message: "IslandType removed", accountRemoved})
        }

        return res.status(404).json({message: "IslandType not found" })
    },

}