const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', typeController.create)
router.get('/', typeController.getAll)
router.get('/:name', typeController.getOne)

module.exports = router
