const {Brand, Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json({id: brand.id, name: brand.name})
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    async getOne(req, res) {
        const {id} = req.params
        const brand = await Brand.findOne(
            {
                where: {id}
            }
        )
        return res.json({id: brand.id, name: brand.name})
    }
}

module.exports = new BrandController()
