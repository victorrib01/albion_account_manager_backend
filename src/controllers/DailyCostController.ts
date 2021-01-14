import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import DailyCost from '../entity/DailyCost';

import Construction from '../entity/Construction';
import Island from '../entity/Island';

export default {

    async lastEarn(req: Request, res: Response) {
        const dailyCostsRepository = getRepository(DailyCost);

        const lastEarn = await dailyCostsRepository.query('SELECT id, value, created_at FROM daily_earnings ORDER BY created_at DESC LIMIT 1');

        return res.json(lastEarn)
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const dailyCostsRepository = getRepository(DailyCost);

        const dailyCost = await dailyCostsRepository.findOneOrFail(id, {
            relations: [
                'products',
                'island'
            ]
        })

        return res.json(dailyCost);
    },

    async index(req: Request, res: Response) {
        const dailyCostsRepository = getRepository(DailyCost);

        const dailyCost = await dailyCostsRepository.find({
            relations: [
                'products',
                'island'
            ]
        })

        return res.json(dailyCost);
    },

    async create(req: Request, res: Response) {
        const {
            value,
            island_id
        } = req.body

        const dailyEaningsRepository = getRepository(DailyCost);

        const islandsRepository = getRepository(Island);
        const island = await islandsRepository.findOneOrFail(island_id);

        const data = {
            value,
            island
        }

        const dailyCost = dailyEaningsRepository.create(data);

        await dailyEaningsRepository.save(dailyCost);

        return res.status(201).json(dailyCost);

        return res.status(500).json('Error')
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const construction = await getRepository(Construction).update(id, req.body)

        if (construction.affected === 1) {
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
            return res.json({ message: "Construction removed", constructionRemoved })
        }

        return res.status(404).json({ message: "Construction not found" })
    },

}