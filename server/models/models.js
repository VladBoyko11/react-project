const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
}, { timestamps: false, freezeTableName: false })

const Basket = sequelize.define('baskets', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}, { timestamps: false, freezeTableName: false })

const BasketDevice = sequelize.define('basket_devices', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    countOfProducts: {type: DataTypes.INTEGER, defaultValue: 1}
}, { timestamps: false, freezeTableName: false })

const Device = sequelize.define('devices', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
}, { timestamps: false, freezeTableName: false })

const Type = sequelize.define('types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, { timestamps: false, freezeTableName: false })

const Brand = sequelize.define('brands', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, { timestamps: false, freezeTableName: false })

const Rating = sequelize.define('ratings', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
}, { timestamps: false, freezeTableName: false })

const DeviceInfo = sequelize.define('device_infos', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
}, { timestamps: false, freezeTableName: false })

const TypeBrand = sequelize.define('type_brands', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}, { timestamps: false, freezeTableName: false })


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}





