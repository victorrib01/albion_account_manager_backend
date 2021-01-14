import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import DailyEarning from '../entity/DailyEarning';

import Construction from '../entity/Construction';
import Island from '../entity/Island';

export default {

    async lastEarn(req: Request, res: Response) {
        const dailyEarningsRepository = getRepository(DailyEarning);

        const lastEarn = await dailyEarningsRepository.query('SELECT id, value, created_at FROM daily_earnings ORDER BY created_at DESC LIMIT 1');

        return res.json(lastEarn)
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const dailyEarningsRepository = getRepository(DailyEarning);

        const dailyEarning = await dailyEarningsRepository.findOneOrFail(id, {
            relations: [
                'construction',
                'island'
            ]
        })

        return res.json(dailyEarning);
    },

    async index(req: Request, res: Response) {
        const dailyEarningsRepository = getRepository(DailyEarning);

        const dailyEarning = await dailyEarningsRepository.find({
            relations: [
                'construction',
                'island'
            ]
        })

        return res.json(dailyEarning);
    },

    async create(req: Request, res: Response) {
        const {
            value,
            construction_id,
            island_id
        } = req.body

        const dailyEaningsRepository = getRepository(DailyEarning);

        if (construction_id != null) {
            const constructionsRepository = getRepository(Construction);
            const construction = await constructionsRepository.findOneOrFail(construction_id)

            const data = {
                value,
                construction
            }
            const dailyEarning = dailyEaningsRepository.create(data);

            await dailyEaningsRepository.save(dailyEarning);

            return res.status(201).json(dailyEarning);
        }

        if(island_id != null) {
            const islandsRepository = getRepository(Island);
            const island = await islandsRepository.findOneOrFail(island_id);
    
            const data = {
                value,
                island
            }
    
            const dailyEarning = dailyEaningsRepository.create(data);
    
            await dailyEaningsRepository.save(dailyEarning);
    
            return res.status(201).json(dailyEarning);
        }

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