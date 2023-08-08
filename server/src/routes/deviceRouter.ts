import express from 'express'
const deviceRouter = express.Router()
import deviceController from '../controllers/deviceController'

// deviceRouter.post('/', deviceController.create)
deviceRouter.get('/', deviceController.getAll)
deviceRouter.get('/deviceIds', deviceController.getAllByIds)
deviceRouter.get('/:id', deviceController.getOne)
deviceRouter.post('/description', deviceController.createDescription)
deviceRouter.get('/description/:deviceId', deviceController.getDeviceDescriptions)

export default deviceRouter
