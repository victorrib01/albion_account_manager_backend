import { Request, Response } from 'express';
import Construction from '../entity/Construction';

import { getRepository } from 'typeorm';
import Building from '../entity/Building';

export default {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const constructionsRepository = getRepository(Construction);

        const construction = await constructionsRepository.findOneOrFail(id)

        return res.json(construction);
    },

    async index(req: Request, res: Response) {
        const constructionsRepository = getRepository(Construction);

        const constructions = await constructionsRepository.find()

        return res.json(constructions);
    },

    async create(req: Request, res: Response) {
        const {
            name,
            tier,
            est_earnings,
            building_id
        } = req.body

        const constructionsRepository = getRepository(Construction);
        const buildingsRepository = getRepository(Building);

        const building = await buildingsRepository.findOneOrFail(building_id);

        const data = {
            name,
            tier,
            est_earnings,
            building
        }

        const construction = constructionsRepository.create(data);

        await constructionsRepository.save(construction);

        return res.status(201).json(construction);
    },

    async update(req: Request, res: Response){
        const { id } = req.params

        const construction = await getRepository(Construction).update(id, req.body)

        if(construction.affected === 1) {
            const constructionUpdated = await getRepository(Construction).findOne(id)
            return res.json(constructionUpdated)
        }

        res.json(construction)
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const construction = await getRepository(Construction).delete(id)

        if (construction.affected === 1) {
            const constructionRemoved = await getRepository(Construction).findOne(id)
            return res.json({message: "Construction removed", constructionRemoved})
        }

        return res.status(404).json({message: "Construction not found" })
    },

}