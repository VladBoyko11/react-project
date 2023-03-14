const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/deviceIds', deviceController.getAllByIds)
router.get('/:id', deviceController.getOne)
router.post('/description', deviceController.createDescription)
router.get('/description/:deviceId', deviceController.getDeviceDescriptions)
module.exports = router
