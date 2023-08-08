import {Brand, Device, DeviceInfo} from '../models/models'
import ApiError from '../error/ApiError';
import { NextFunction, Request, Response } from 'express';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config';

class BrandController {
    async create(req: Request, res: Response, next: NextFunction) {
        // const {name} = req.body
        // const brand = await Brand.create({name})
        // return res.json({id: brand.id, name: brand.name})
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        // const {id} = req.params
        // const brand = await Brand.findOne(
        //     {
        //         where: {id}
        //     }
        // )
        // return res.json({id: brand.id, name: brand.name})
    }
}

export default new BrandController()
