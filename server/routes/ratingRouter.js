const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')

router.get('/:deviceID', ratingController.getDeviceRating)
router.get('/user/:userId', ratingController.getUserRatings)
router.post('/', ratingController.addDeviceRating)

module.exports = router
