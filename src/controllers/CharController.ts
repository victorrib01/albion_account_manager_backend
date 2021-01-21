import { Request, Response } from 'express';
import Char from '../entity/Char';

import { getRepository } from 'typeorm';
import Account from '../entity/Account';
import User from '../entity/User';

export default {

    async index(req: Request, res: Response) {
        const userId = req.userId;

        const charsRepository = getRepository(Char);
       
        const chars = charsRepository.find({
            join: { alias: 'chars', innerJoin: { accounts: 'chars.accounts'} },
            where: qb => {
                qb.where({
                    account: userId,
                })
            }
        })

        return res.json(chars);
    },

    async create(req: Request, res: Response) {
        const userId = parseInt(req.userId);
        const {
            nickname,
            premium,
            first_premium,
            silver,
            account_id
        } = req.body

        const charsRepository = getRepository(Char);

        const accountsRepository = getRepository(Account)

        const account = await accountsRepository.findOneOrFail(account_id, {relations: ['user']})

        if(account.user.id === userId){
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
        }else{
            return res.sendStatus(401)
        }
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