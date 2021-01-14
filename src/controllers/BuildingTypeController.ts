import { Request, Response } from 'express';
import Building from '../entity/BuildingType';

import { getRepository } from 'typeorm';

export default {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const buildingsRepository = getRepository(Building);

        const buildings = await buildingsRepository.findOneOrFail(id, {
            relations: ['constructions']
        })

        return res.json(buildings);
    },

    async index(req: Request, res: Response) {
        const buildingsRepository = getRepository(Building);

        const buildings = await buildingsRepository.find({
            relations: ['constructions']
        })

        return res.json(buildings);
    },

    async create(req: Request, res: Response) {
        const {
            name
        } = req.body

        const buildingsRepository = getRepository(Building);

        const data = {
            name
        }

        const building = buildingsRepository.create(data);

        await buildingsRepository.save(building);

        return res.status(201).json(building);
    },

    async update(req: Request, res: Response){
        const { id } = req.params

        const building = await getRepository(Building).update(id, req.body)

        if(building.affected === 1) {
            const accountUpdated = await getRepository(Building).findOne(id)
            return res.json(accountUpdated)
        }

        res.json(building)
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const building = await getRepository(Building).delete(id)

        if (building.affected === 1) {
            const accountRemoved = await getRepository(Building).findOne(id)
            return res.json({message: "Building removed", accountRemoved})
        }

        return res.status(404).json({message: "Building not found" })
    },

}