import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../entity/User';

export default {
    async getUserId(req: Request, res: Response) {
        return res.send({ userId: req.userId })
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const userRepository = getRepository(User);

        const users = await userRepository.findOneOrFail(id, {
            relations: ['users']
        })

        return res.json(users);
    },

    async index(req: Request, res: Response) {
        const userRepository = getRepository(User);

        const users = await userRepository.find({
            relations: ['users']
        })

        return res.json(users);
    },

    async create(req: Request, res: Response) {
        const userRepository = getRepository(User);

        const {
            email,
            password,
            admin
        } = req.body

        const userExists = await userRepository.findOne({ where: { email } })

        if(userExists) {
            return res.sendStatus(401)
        } else{

            const data = {
                email,
                password,
                admin
            }
    
            const user = userRepository.create(data);
    
            await userRepository.save(user);
    
            return res.status(201).json(user);

        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const user = await getRepository(User).delete(id)

        if (user.affected === 1) {
            const accountRemoved = await getRepository(User).findOne(id)
            return res.json({message: "User removed", accountRemoved})
        }

        return res.status(404).json({message: "User not found" })
    },

}