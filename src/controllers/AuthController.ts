import { Request, Response } from 'express';
import {compare} from 'bcryptjs'
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken'

import User from '../entity/User';

export default {
    async authenticate(req: Request, res: Response) {
        const userRepository = getRepository(User)
        const { email, password } = req.body

        const user = await userRepository.findOne( { where: { email } } )

        if(!user) {
            return res.sendStatus(401).json('Could not find user!')
        }

        const isValidPassword = await compare(password, user.password);

        if(!isValidPassword) {
            return res.sendStatus(401).json('Wrong password!')
        }

        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})

        return res.json({
            email,
            token
        })
    },
}