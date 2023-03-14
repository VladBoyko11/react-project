const {Type, Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json({id: type.id, name: type.name})
    }
    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async getOne(req, res) {
        const {name} = req.params
        const type = await Type.findOne(
            {
                where: {name}
            },
        )
        return res.json({id: type.id, name: type.name})
    }
}

module.exports = new TypeController()
