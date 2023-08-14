import { NextFunction, Request, Response } from 'express';
import {prisma} from '../index'

class RatingController {
    async getDeviceRating(req: Request, res: Response, next: NextFunction) {
        const {deviceID} = req.params
        const ratings = await prisma.rating.findMany({where: {deviceId: Number(deviceID)}})
        if(ratings) return res.json(ratings)
        else return res.json('Device has not rating yet')
    }
    async getUserRatings(req: Request, res: Response, next: NextFunction) {
        const {userId} = req.params
        const ratings = await prisma.rating.findMany({where: {userId: Number(userId)}})
        if(ratings) return res.json(ratings)
        else return res.json('User ratings are not found')
    }
    async addDeviceRating(req: Request, res: Response, next: NextFunction) {
        const {userId, deviceId, rate} = req.body
        const id = deviceId
        const candidate = await prisma.rating.findUnique({where: {
            userId: Number(userId),
            deviceId: Number(deviceId)
        }})
        if (candidate) {
            await prisma.rating.update({
                where: {userId, deviceId},
                data: {rate}
            })
        } else {
            await prisma.rating.create({data: {userId, deviceId, rate}})
        }
        const deviceRatings = await prisma.rating.findMany({where: {deviceId}})
        const sumDeviceRatings = deviceRatings.map(value => value.rate).reduce((acc, current) => acc + current)
        const rating = Math.round(sumDeviceRatings / deviceRatings.length)
        await prisma.device.update({where: {id: id}, data: {rating}})
        return res.json(rating)
    }
}

export default new RatingController()
