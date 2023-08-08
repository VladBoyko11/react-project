const {Rating, Device} = require('../models/models')
import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError';

class RatingController {
    async getDeviceRating(req: Request, res: Response, next: NextFunction) {
        const {deviceID} = req.params
        const rating = await Rating.findAndCountAll({where: {deviceId: deviceID}})
        return res.json(rating)
    }
    async getUserRatings(req: Request, res: Response, next: NextFunction) {
        const {userId} = req.params
        const ratings = await Rating.findAll({where: {userId}})
        return res.json(ratings)
    }
    async addDeviceRating(req: Request, res: Response, next: NextFunction) {
        const {userId, deviceId, rate} = req.body
        const id = deviceId
        const candidate = await Rating.findOne({where: {userId, deviceId}})
        if (candidate) {
            await Rating.update({rate} ,{where: {userId, deviceId}})
            // return next(ApiError.badRequest('Вы уже добавили оценку этому товару'))
        } else {
            await Rating.create({userId, deviceId, rate})
        }
        const deviceRatingObject = await Rating.findAndCountAll({where: {deviceId}})
        let deviceRatings = 0
        deviceRatingObject.rows.forEach((value: any) => {
            deviceRatings = deviceRatings + value.rate
        })
        let rating = Math.round(deviceRatings / deviceRatingObject.count)
        await Device.update({rating} ,{where: {id: id}})
        return res.json(rating)
    }
}

export default new RatingController()
