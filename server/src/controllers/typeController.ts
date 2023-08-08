import { NextFunction, Request, Response } from "express";

import { Type, Device, DeviceInfo } from '../models/models';
import ApiError from '../error/ApiError';

class TypeController {
    async create(req: Request, res: Response, next: NextFunction) {
        // const {name} = req.body
        // const type = await Type.create({name})
        // return res.json({id: type.id, name: type.name})
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        // const {name} = req.params
        // const type = await Type.findOne(
        //     {
        //         where: {name}
        //     },
        // )
        // return res.json({id: type.id, name: type.name})
    }
}

export default new TypeController()