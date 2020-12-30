import { Request, Response } from 'express';
import Char from '../entity/Char';

import { getRepository } from 'typeorm';
import Account from '../entity/Account';

export default {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const charsRepository = getRepository(Char);

        const chars = await charsRepository.findOneOrFail(id, {
            relations: [
                'island'
            ]
        })

        return res.json(chars);
    },

    async index(req: Request, res: Response) {
        const charsRepository = getRepository(Char);

        const chars = await charsRepository.find({
            relations: [
                'island',
                'account'
            ]
        })

        return res.json(chars);
    },

    async create(req: Request, res: Response) {
        const {
            nickname,
            premium,
            first_premium,
            silver,
            account_id
        } = req.body

        const charsRepository = getRepository(Char);

        const accountsRepository = getRepository(Account)

        const account = await accountsRepository.findOneOrFail(account_id)

        const data = {
            nickname,
            premium,
            first_premium,
            silver,
            account
        }

        const char = charsRepository.create(data);

        await charsRepository.save(char);

        return res.status(201).json(char);
    },

    async update(req: Request, res: Response){
        const { id } = req.params

        const char = await getRepository(Char).update(id, req.body)

        if(char.affected === 1) {
            const charUpdated = await getRepository(Char).findOne(id)
            return res.json(charUpdated)
        }

        res.json(char)
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const char = await getRepository(Char).delete(id)

        if (char.affected === 1) {
            const charRemoved = await getRepository(Char).findOne(id)
            return res.json({message: "Char removed", charRemoved})
        }

        return res.status(404).json({message: "Char not found" })
    },

}