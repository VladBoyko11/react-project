import express from 'express'
const basketRouter = express.Router()
import basketController from '../controllers/basketController'

basketRouter.get('/:userId', basketController.getBasket )
basketRouter.get('/devices/:basketId', basketController.getBasketDevices)
basketRouter.delete('/devices/:basketId', basketController.deleteDeviceFromBasket)
basketRouter.post('/:id', basketController.addDeviceToBasket)
basketRouter.post('/devices/:deviceId', basketController.changeCountOfProducts)
basketRouter.delete('/:id', basketController.removeDeviceFromBasket)

export default basketRouter
