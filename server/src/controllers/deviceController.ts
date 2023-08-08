import { NextFunction, Request, Response } from "express";

import uuid from "uuid";
import path from "path";
import { Device, DeviceInfo } from "../models/models";
import ApiError from "../error/ApiError";
import { Model, Op, Optional } from "sequelize";


class DeviceController {
  // async create(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     let { name, price, brandId, typeId, info } = req.body;
  //     const { img } = req.files;
  //     let fileName = uuid.v4() + ".jpg";
  //     img.mv(path.resolve(__dirname, "..", "static", fileName));
  //     const device = await Device.create({
  //       name,
  //       price,
  //       brandId,
  //       typeId,
  //       img: fileName,
  //     });

  //     if (info) {
  //       info = JSON.parse(info);
  //       info.forEach((i) =>
  //         DeviceInfo.create({
  //           title: i.title,
  //           description: i.description,
  //           deviceId: device.id,
  //         })
  //       );
  //     }

  //     return res.json(device);
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }
  async getAll(req: Request, res: Response, next: NextFunction) {
    // let { brandId, typeId, limit, page } = req.query;
    // const myLimit: number = Number(limit) | 1
    // const myPage: number = Number(page) | 6
    // const myBrandId: number = Number(brandId)

    // let offset = Number(page) * Number(limit) - Number(limit);
    // let devices;
    // if (brandId == 'undefined' && typeId == 'undefined') {
    //   devices = await Device.findAndCountAll({ limit: myLimit, offset });
    // }
    // if (brandId != 'undefined' && typeId == 'undefined') {
    //   devices = await Device.findAndCountAll({ where: { brandId: myBrandId }, limit: myLimit, offset })
    // }
    // if (brandId == 'undefined' && typeId != 'undefined') {
    //   devices = await Device.findAndCountAll({ where: { typeId }, limit: myLimit, offset });
    // }

    // return res.json(devices);
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    // const { id } = req.params;
    // type DeviceAttributes = {
    //   id: string,
    //   name: string,
    //   price: number,
    //   rating: number,
    //   img: string,
    //   typeId: number,
    //   brandId: number
    // }

    // type DeviceCreationAttributes = Optional<DeviceAttributes, 'id'>

    // try {
    //   const device = await Device.findOne<Model<DeviceAttributes, 'id'>>({
    //     where: { id },
    //     include: [{ model: DeviceInfo, as: "info" }],
    //   });
    //   return res.json({
    //     id: device.id,
    //     name: device.name,
    //     price: device.price,
    //     rating: device.rating,
    //     img: device.img,
    //     typeId: device.typeId,
    //     brandId: device.brandId,
    //   });
    // } catch (e) {
    //   return res.json(`Error: ${e}`)
    // }
  }

  async createDescription(req: Request, res: Response, next: NextFunction) {
    const { deviceId, title, description } = req.body;
    const deviceInfo = await DeviceInfo.findOne({ where: { title, deviceId } });
    if (deviceInfo) {
      await DeviceInfo.update({ description }, { where: { title, deviceId } });
      return res.json({ description });
    } else {
      await DeviceInfo.create({ title, description, deviceId });
      return res.json({ description });
    }
  }
  async getDeviceDescriptions(req: Request, res: Response, next: NextFunction) {
    const { deviceId } = req.params;
    const deviceDescriptions = await DeviceInfo.findAndCountAll({
      where: { deviceId },
    });
    return res.json(deviceDescriptions);
  }
  async getAllByIds(req: Request, res: Response, next: NextFunction) {
    let { deviceIds } = req.query;
    deviceIds = String(deviceIds).split(',')
    deviceIds = deviceIds.map(id => {
      return { id }
    })

    const devices = await Device.findAll({
      where: {
        [Op.or]: deviceIds,
      }
    })
    return res.json(devices)
  }
}

export default new DeviceController()
