import sequelize from '../db'
import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Optional } from 'sequelize'


class User extends Model<InferAttributes<User, { omit: 'basket' & 'ratings' }>, InferCreationAttributes<User, { omit: 'basket' & 'ratings' }>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare role: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare basket?: NonAttribute<Basket>;
    declare ratings?: NonAttribute<Rating[]>

    declare static associations: {
        basket: Association<User, Basket>
    };
}

class Rating extends Model<InferAttributes<Rating>, InferCreationAttributes<Rating>> {
    declare id: CreationOptional<number>;
    declare rate: number;

    declare userId: ForeignKey<User['id']>
    declare user?: NonAttribute<User>

    declare devices?: NonAttribute<Device[]>

    declare static associations: {
        rating: Association<Rating, User>
    };

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

class Basket extends Model<InferAttributes<Basket, { omit: 'basketDevices' }>, InferCreationAttributes<Basket, { omit: 'basketDevices' }>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare role: string;

    declare userId: ForeignKey<User['id']>
    declare user?: NonAttribute<User>

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare basketDevices?: NonAttribute<BasketDevice[]>;

    declare static associations: {
        basket: Association<User, Basket>
    };
}

class BasketDevice extends Model<InferAttributes<BasketDevice, { omit: 'device' & 'basket' }>, InferCreationAttributes<BasketDevice, { omit: 'device' & 'basket' }>> {
    declare id: CreationOptional<number>;

    declare basketId: ForeignKey<Basket['id']>
    declare basket?: NonAttribute<Basket>
    declare deviceId: ForeignKey<Device['id']>
    declare device?: NonAttribute<Device>

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare static associations: {
        basket: Association<BasketDevice, Basket>,
        device: Association<BasketDevice, Device>
    };
}

class Device extends Model<InferAttributes<Device, { omit: 'devices' }>, InferCreationAttributes<Device, { omit: 'devices' }>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare role: string;

    declare userId: ForeignKey<User['id']>
    declare user?: NonAttribute<User>

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare devices?: NonAttribute<Device[]>;

    declare static associations: {
        basket: Association<User, Basket>
    };
}

// export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
//     id?: number,
//     email: string,
//     password: string,
//     role: string,
// }

// export interface BasketModel extends Model<InferAttributes<BasketModel>, InferCreationAttributes<BasketModel>> {
//     id: number,
//     userId: ForeignKey<number>
// }

// export interface BasketDeviceModel extends Model<InferAttributes<BasketDeviceModel>, InferCreationAttributes<BasketDeviceModel>> {
//     id: number,
//     countOfProducts: number,
// }

// export interface DeviceModel extends Model<InferAttributes<DeviceModel>, InferCreationAttributes<DeviceModel>> {
//     id: number,
//     name: string,
//     price: number,
//     rating: number,
//     img: string,
// }

// export interface TypeModel extends Model<InferAttributes<TypeModel>, InferCreationAttributes<TypeModel>> {
//     id: number,
//     name: string,
// }

// export interface BrandModel extends Model<InferAttributes<BrandModel>, InferCreationAttributes<BrandModel>> {
//     id: number,
//     name: string,
// }

// export interface RatingModel extends Model<InferAttributes<RatingModel>, InferCreationAttributes<RatingModel>> {
//     id: number,
//     rate: number,
// }

// export interface DeviceInfoModel extends Model<InferAttributes<DeviceInfoModel>, InferCreationAttributes<DeviceInfoModel>> {
//     id: number,
//     title: string,
//     description: string,
// }

// export interface TypeBrandModel extends Model<InferAttributes<TypeBrandModel>, InferCreationAttributes<TypeBrandModel>> {
//     id: number,
// }

// export const User = sequelize.define<UserModel>('users', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     email: {type: DataTypes.STRING, unique: true,},
//     password: {type: DataTypes.STRING},
//     role: {type: DataTypes.STRING, defaultValue: "USER"},
// }, { timestamps: false, freezeTableName: false })

// export const Basket = sequelize.define<BasketModel>('baskets', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     userId: {type: DataTypes.INTEGER}
// }, { timestamps: false, freezeTableName: false })

// export const BasketDevice = sequelize.define<BasketDeviceModel>('basket_devices', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     countOfProducts: {type: DataTypes.INTEGER, defaultValue: 1}
// }, { timestamps: false, freezeTableName: false })

// export const Device = sequelize.define<DeviceModel>('devices', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
//     price: {type: DataTypes.INTEGER, allowNull: false},
//     rating: {type: DataTypes.INTEGER, defaultValue: 0},
//     img: {type: DataTypes.STRING, allowNull: false},
// }, { timestamps: false, freezeTableName: false })

// export const Type = sequelize.define<TypeModel>('types', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// }, { timestamps: false, freezeTableName: false })

// export const Brand = sequelize.define<BrandModel>('brands', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// }, { timestamps: false, freezeTableName: false })

// export const Rating = sequelize.define<RatingModel>('ratings', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     rate: {type: DataTypes.INTEGER, allowNull: false},
// }, { timestamps: false, freezeTableName: false })

// export const DeviceInfo = sequelize.define<DeviceInfoModel>('device_infos', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     title: {type: DataTypes.STRING, allowNull: false},
//     description: {type: DataTypes.STRING, allowNull: false},
// }, { timestamps: false, freezeTableName: false })

// export const TypeBrand = sequelize.define<TypeBrandModel>('type_brands', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// }, { timestamps: false, freezeTableName: false })


// User.hasOne(Basket, {
//     sourceKey: 'id',
//     keyType: 'userId'
// })
// Basket.belongsTo(User, { targetKey: 'id' })

// User.hasMany(Rating)
// Rating.belongsTo(User, { targetKey: 'id' })

// Basket.hasMany(BasketDevice, {
//     sourceKey: 'id',
//     foreignKey: 'deviceId',
// })
// BasketDevice.belongsTo(Basket)

// Type.hasMany(Device)
// Device.belongsTo(Type)FFF

// Brand.hasMany(Device)
// Device.belongsTo(Brand)

// Device.hasMany(Rating)
// Rating.belongsTo(Device)

// Device.hasMany(BasketDevice)
// BasketDevice.belongsTo(Device)

// Device.hasMany(DeviceInfo, {as: 'info'});
// DeviceInfo.belongsTo(Device)

// Type.belongsToMany(Brand, {through: TypeBrand })
// Brand.belongsToMany(Type, {through: TypeBrand })








