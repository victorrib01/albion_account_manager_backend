import { Request, Response } from 'express';
import Island from '../entity/Island';

import { getRepository } from 'typeorm';
import Char from '../entity/Char';

export default {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const islandsRepository = getRepository(Island);

        const islands = await islandsRepository.findOneOrFail(id)

        return res.json(islands);
    },

    async index(req: Request, res: Response) {
        const islandsRepository = getRepository(Island);

        const islands = await islandsRepository.find({
            relations: ['char']
        })

        return res.json(islands);
    },

    async create(req: Request, res: Response) {
        const {
            level,
            daily_earnings,
            active,
            char_id
        } = req.body

        const islandsRepository = getRepository(Island);

        const charsRepository = getRepository(Char)

        const char = await charsRepository.findOneOrFail(char_id)

        const data = {
            level,
            daily_earnings,
            active,
            char
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