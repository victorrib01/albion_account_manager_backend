import { Request, Response } from 'express';
import Account from '../entity/Account';

import { getRepository } from 'typeorm';

export default {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const accountsRepository = getRepository(Account);

        const accounts = await accountsRepository.findOneOrFail(id)

        return res.json(accounts);
    },

    async index(req: Request, res: Response) {
        const accountsRepository = getRepository(Account);

        const accounts = await accountsRepository.find({
            relations: ['chars']
        })

        return res.json(accounts);
    },

    async create(req: Request, res: Response) {
        const {
            email,
            password
        } = req.body

        const accountsRepository = getRepository(Account);

        const data = {
            email,
            password
        }

        const account = accountsRepository.create(data);

        await accountsRepository.save(account);

        return res.status(201).json(account);
    },

    async update(req: Request, res: Response){
        const { id } = req.params

        const account = await getRepository(Account).update(id, req.body)

        if(account.affected === 1) {
            const accountUpdated = await getRepository(Account).findOne(id)
            return res.json(accountUpdated)
        }

        res.json(account)
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const account = await getRepository(Account).delete(id)

        if (account.affected === 1) {
            const accountRemoved = await getRepository(Account).findOne(id)
            return res.json({message: "Account removed", accountRemoved})
        }

        return res.status(404).json({message: "Account not found" })
    },

}