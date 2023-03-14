const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.get('/:userId', basketController.getBasket )
router.get('/devices/:basketId', basketController.getBasketDevices)
router.delete('/devices/:basketId', basketController.deleteDeviceFromBasket)
router.post('/:id', basketController.addDeviceToBasket)
router.post('/devices/:deviceId', basketController.changeCountOfProducts)
router.delete('/:id', basketController.removeDeviceFromBasket)

module.exports = router
