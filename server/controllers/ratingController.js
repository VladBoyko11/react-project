const {Rating, Device} = require('../models/models')
const ApiError = require('../error/ApiError');

class RatingController {
    async getDeviceRating(req, res, next) {
        const {deviceID} = req.params
        const rating = await Rating.findAndCountAll({where: {deviceId: deviceID}})
        return res.json(rating)
    }
    async getUserRatings(req, res, next) {
        const {userId} = req.params
        const ratings = await Rating.findAll({where: {userId}})
        return res.json(ratings)
    }
    async addDeviceRating(req, res, next) {
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
        deviceRatingObject.rows.forEach(value => {
            deviceRatings = deviceRatings + value.rate
        })
        let rating = Math.round(deviceRatings / deviceRatingObject.count)
        await Device.update({rating} ,{where: {id: id}})
        return res.json(rating)
    }
}

module.exports = new RatingController()
