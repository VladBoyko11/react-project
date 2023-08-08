import {Basket, BasketDevice, User} from '../models/models'
import ApiError from '../error/ApiError';
import { NextFunction, Request, Response } from 'express';

class BasketController {
    async getBasket(req: Request, res: Response, next: NextFunction) {
        const {userId} = req.params
        const basket = await Basket.findOne({where: {userId}})
        if(basket) return res.json({id: basket.id})
        else return res.json('basket is not found')
    }
    async getBasketDevices(req: Request, res: Response, next: NextFunction) {
        const {basketId} = req.params
        const devices = await BasketDevice.findAndCountAll({where: {basketId}})
        return res.json(devices)
    }
    async deleteDeviceFromBasket(req: Request, res: Response, next: NextFunction) {
        const {deviceId} = req.query
        const {basketId} = req.params
        const candidate = await BasketDevice.findOne({where: {basketId, deviceId}})
        if (candidate) {
            await BasketDevice.destroy({where: {basketId, deviceId}})    
            return res.json(candidate)
        }
    }
    async addDeviceToBasket(req: Request, res: Response, next: NextFunction) {
        // const {id} = req.params
        // const basketId = id
        // const {deviceId} = req.query
        // const candidate = await BasketDevice.findOne({where: {basketId, deviceId}})
        // if (candidate) {
        //     return next(ApiError.badRequest('Товар уже добавлен в корзину'))
        // }
        // const basketItem = await BasketDevice.create({basketId: Number(id), deviceId: Number(deviceId)})
        // res.json({id: basketItem.id, basketId: basketItem.basketId, deviceId: basketItem.deviceId, countOfProducts: basketItem.countOfProducts})
    }
    async removeDeviceFromBasket(req: Request, res: Response, next: NextFunction) {
        // const {id} = req.params
        // let basketId = id
        // const {deviceId} = req.query
        // const candidate = await BasketDevice.findOne({where: {deviceId}})
        // if (!candidate) {
        //     return next(ApiError.badRequest('Такого товара нету в корзине'))
        // }
        // const basketItem = await BasketDevice.destroy({where: {deviceId, basketId}})
        // res.json({id: basketItem.id, basketId: basketItem.basketId, deviceId: basketItem.deviceId, countOfProducts: basketItem.countOfProducts})
    }
    async changeCountOfProducts(req: Request, res: Response, next: NextFunction) {
        const {deviceId} = req.params
        const {countOfProducts} = req.body
        let device = await BasketDevice.findOne({where: {deviceId}})
        if(!device) return res.json('Device not found')
        if(!countOfProducts) return res.json('Error, countOfProducts not found')
        await BasketDevice.update({countOfProducts}, {where: {deviceId}})
        device = await BasketDevice.findOne({where: {deviceId}})
        return res.json(device)
    }
}

export default new BasketController()
