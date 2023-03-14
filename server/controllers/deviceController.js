const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op, json } = require("sequelize");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 6;
    let offset = page * limit - limit;
    let devices;
    if (brandId == 'undefined' && typeId == 'undefined') {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId != 'undefined' && typeId == 'undefined') {
      devices = await Device.findAndCountAll({ where: {brandId}, limit, offset })
    }
    if (brandId == 'undefined' && typeId != 'undefined') {
      devices = await Device.findAndCountAll({ where: {typeId}, limit, offset });
    }
  
    // const countOfPage = Math.ceil(devices.count / limit);
    // const lastDeviceIndex = page * limit;
    // const firstDeviceIndex = lastDeviceIndex - limit;
    // const currentDevices = { ...devices }
    // if (countOfPage === page) currentDevices.rows = devices.rows.slice(
    //     firstDeviceIndex,
    //     devices.rows.length - 1
    //   );
    // else currentDevices.rows = devices.rows.slice(
    //     firstDeviceIndex,
    //     lastDeviceIndex
    //   )

    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json({
        id: device.id,
        name: device.name,
        price: device.price,
        rating: device.rating,
        img: device.img,
        typeId: device.typeId,
        brandId: device.brandId,
      });
  }

  async createDescription(req, res, next) {
    const { deviceId, title, description } = req.body;
    const deviceInfo = await DeviceInfo.findOne({ where: { title, deviceId } });
    if (deviceInfo) {
      await DeviceInfo.update({ description }, { where: { title, deviceId } });
      return res.json({description});
    } else {
      await DeviceInfo.create({ title, description, deviceId });
      return res.json({description});
    }
  }
  async getDeviceDescriptions(req, res, next) {
    const { deviceId } = req.params;
    const deviceDescriptions = await DeviceInfo.findAndCountAll({
      where: { deviceId },
    });
    return res.json(deviceDescriptions);
  }
  async getAllByIds(req, res) {
    let { deviceIds } = req.query;
    deviceIds = String(deviceIds).split(',')
    deviceIds = deviceIds.map(id => {
      return {id}
    })

    const devices = await Device.findAll({
      where: {
        [Op.or]: deviceIds,
      }
    })
    return res.json(devices)
  }
}

module.exports = new DeviceController();
