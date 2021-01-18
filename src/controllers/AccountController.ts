import { Request, Response } from 'express';
import Account from '../entity/Account';
import User from '../entity/User';

import { getRepository } from 'typeorm';

export default {

    async index(req: Request, res: Response) {
        const userId = req.userId;

        const accountsRepository = getRepository(Account);

        const accounts = await accountsRepository.find({
            where: { user: { id: userId } },
            relations: ['chars']
        })

        return res.json(accounts);
    },

    async create(req: Request, res: Response) {
        const {
            email,
            password
        } = req.body

        const userId = req.userId;
        const userRepository = getRepository(User);
        const user = await userRepository.findOneOrFail(userId);

        const accountsRepository = getRepository(Account);

        const data = {
            email,
            password,
            user
        }

        const account = accountsRepository.create(data);

        await accountsRepository.save(account);

        return res.status(201).json(account);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { email, password } = req.body
        const userId = parseInt(req.userId)

        const accountsRepository = getRepository(Account);

        const account = await accountsRepository.findOne(id, {relations: ['user']})

        if(account.user.id === userId){
            try {
                const account = await accountsRepository.create({
                    id: parseInt(id),
                    email,
                    password
                })

                await accountsRepository.save(account);

                res.json(account)
            } catch (err) {
                console.log(err)
            }
        }else{
            return res.sendStatus(401);
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const userId = parseInt(req.userId)

        const accountsRepository = getRepository(Account);

        const account = await accountsRepository.findOne(id, {relations: ['user']})
        if(!account) {
            return res.status(404).json({ message: "Account not found" })
        }
        if(account.user.id === userId){
            try {
                const account = await accountsRepository.delete(id)
                if(account.affected === 1){
                    res.json('Account deleted')
                }else{
                    res.json('Failed to delete account')
                }
            } catch (err) {
                console.log(err)
            }
        }else{
            return res.sendStatus(401);
        }
    },
}