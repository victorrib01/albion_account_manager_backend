import { Request, Response } from 'express';
import Location from '../entity/Location';

import { getRepository } from 'typeorm';
import Island from '../entity/Island';

export default {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const locationsRepository = getRepository(Location);

        const locations = await locationsRepository.findOneOrFail(id, {
            relations: ['island']
        })

        return res.json(locations);
    },

    async index(req: Request, res: Response) {
        const locationsRepository = getRepository(Location);

        const locations = await locationsRepository.find({
            relations: ['island']
        })

        return res.json(locations);
    },

    async create(req: Request, res: Response) {
        const {
            name
        } = req.body

        const locationsRepository = getRepository(Location);

        const data = {
            name
        }

        const building = locationsRepository.create(data);

        await locationsRepository.save(building);

        return res.status(201).json(building);
    },

    async update(req: Request, res: Response){
        const { id } = req.params

        const building = await getRepository(Location).update(id, req.body)

        if(building.affected === 1) {
            const accountUpdated = await getRepository(Location).findOne(id)
            return res.json(accountUpdated)
        }

        res.json(building)
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const building = await getRepository(Location).delete(id)

        if (building.affected === 1) {
            const accountRemoved = await getRepository(Location).findOne(id)
            return res.json({message: "Location removed", accountRemoved})
        }

        return res.status(404).json({message: "Location not found" })
    },

}