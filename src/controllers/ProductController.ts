import { Request, Response } from 'express';
import Product from '../entity/Product';

import { getRepository } from 'typeorm';
import Construction from '../entity/Construction';

export default {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const productsRepository = getRepository(Product);

        const products = await productsRepository.findOneOrFail(id)

        return res.json(products);
    },

    async index(req: Request, res: Response) {
        const productsRepository = getRepository(Product);

        const products = await productsRepository.find()

        return res.json(products);
    },

    async create(req: Request, res: Response) {
        const {
            name,
            tier,
            est_value,
            construction_id
        } = req.body

        const productsRepository = getRepository(Product);
        const constructionsRepository = getRepository(Construction);

        const construction = await constructionsRepository.findOneOrFail(construction_id)

        const data = {
            name,
            tier,
            est_value,
            construction
        }

        const product = productsRepository.create(data);

        await productsRepository.save(product);

        return res.status(201).json(product);
    },

    async update(req: Request, res: Response){
        const { id } = req.params

        const product = await getRepository(Product).update(id, req.body)

        if(product.affected === 1) {
            const productUpdated = await getRepository(Product).findOne(id)
            return res.json(productUpdated)
        }

        res.json(product)
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const product = await getRepository(Product).delete(id)

        if (product.affected === 1) {
            const productRemoved = await getRepository(Product).findOne(id)
            return res.json({message: "Product removed", productRemoved})
        }

        return res.status(404).json({message: "Product not found" })
    },

}