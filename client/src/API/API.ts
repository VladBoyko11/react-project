import axios, { AxiosResponse } from 'axios'
import { Brand, Device, Type } from '../redux/types'

const instance = axios.create({
    baseURL: 'http://localhost:5000/'
})

const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${sessionStorage.getItem('token')}`
    return config
}

instance.interceptors.request.use(authInterceptor)

export type deviceApiParams = {
    typeId?: number
    deviceId?: number
    brandId?: number
    userId?: number
    limit?: number
    page?: number
    typeName?: string
}

export const deviceApi = {
    async getDevices(params: deviceApiParams) {
        if(!params) {
            return instance.get(`api/device`).then(response => response.data).then(res => res)
        }
        if(params.deviceId && !params.limit) {
            return instance.get(`api/device/${params.deviceId}`).then(response => response)
        }
        if(params.deviceId && params.limit && params.page) {
            return instance.get(`api/device/${params.deviceId}?limit=${params.limit}&page=${params.page}`).then(response => response)
        }
        return instance.get(`api/device?limit=${params.limit}&page=${params.page}&brandId=${params.brandId}&typeId=${params.typeId}`).then(response => response)
    },
    async getBrands(params?: deviceApiParams) {
        if(!params) {
            return instance.get('/api/brand').then(response => response)
        }
        if(params.brandId) {
            return instance.get(`api/brand/${params.brandId}`).then(response => response)
        }
        return instance.get(`/api/brand${params}`).then(response => response)
    },
    async getTypes(params?: deviceApiParams) {
        if(!params) return instance.get('/api/type').then(response => response)
        if(!params.typeName) return instance.get('/api/type').then(response => response)
        else return instance.get(`/api/type/${params.typeName}`).then(response => response)
    },
    async addYourDeviceRating(rating: number, userId: number, deviceId: number) {
        return instance.post('api/rating', {userId, deviceId, rate: rating}).then(res => res)
    },
    async getDeviceDescription(deviceId: string) {
        return instance.get(`api/device/description/${deviceId}`).then(res => res)
    },
    async getDevicesByIds(deviceIds: Array<number>) {
        return instance.get(`api/device/deviceIds?deviceIds=${deviceIds}`).then(res => res)
    }
}

export const loginAPI = {
    async login(email: string, password: string) {
        return instance.post('api/user/login', {email, password}).then(res => res)
    },
    async auth(){
        return instance.get('api/user/auth').then(res => res).catch(err => err)
    },
    async registration(email: string, password: string) {
        return instance.post('api/user/registration', {email, password}).then(res => res)
    },
    async getYourRatings (userId: number) {
        return instance.get(`api/rating/user/${userId}`).then(res => res)
    },
    async setNewEmail (email: string, id: number) {
        return instance.post('api/user/newEmail', {email, id}).then(res => res) 
    }
}

type adminApiType = {
    file: Blob | string, 
    addType ({name}: Type): Promise<Type>,
    addBrand ({name}: Brand): Promise<Response>,
    addDevice ({name, price, brandId, typeId}: Device): Promise<Device>,
    addPhoto (File: Blob | string): Promise<Blob | string>
}

export const adminApi: adminApiType = {
    file:  '',
    async addType({name}: Type) {
        return instance.post('/api/type', {name}) as Type
    },
    async addBrand({name}: Brand) {
        return instance.post('/api/brand', {name})
    },
    async addDevice({name, price, brandId, typeId}: Device) {
        const formData = new FormData()
        if(name) formData.append('name', name)
        formData.append('price', String(price))
        formData.append('brandId', String(brandId))
        formData.append('typeId', String(typeId))
        if(this.file !== '') formData.append('img', this.file)
        return instance.post('/api/device', formData, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        }) as Device
    },
    async addPhoto(File: Blob | string) {
        this.file = File
        return this.file
    }
}

interface basketApiData {
    file?: Blob | string,
    getBasket(params: {basketId?: number, deviceId?: number, userId?: number}): Promise<AxiosResponse>
    addDeviceToBasket(params: {basketId?: number, deviceId?: number}): Promise<AxiosResponse>
    getDevicesFromBasket(params: {basketId?: number, deviceId?: number}):  Promise<AxiosResponse>
    deleteDeviceFromBasket(params: {basketId?: number, deviceId?: number}): Promise<AxiosResponse>,
    changeCountOfProducts({deviceId, countOfProducts}: {deviceId: number, countOfProducts: number}): Promise<AxiosResponse>
}

export const basketApi: basketApiData = {
    async getBasket(params) {
        const res = await instance.get(`/api/basket/${params.userId}`)
        return res
    },
    async addDeviceToBasket(params){
        return instance.post(`api/basket/${params.basketId}?deviceId=${params.deviceId}`).then(res => res)
    },
    async getDevicesFromBasket(params){
        return instance.get(`api/basket/devices/${params.basketId}`).then(res => res)
    },
    async deleteDeviceFromBasket(params) {
        return instance.delete(`api/basket/${params.basketId}?deviceId=${params.deviceId}`).then(res => res)
    },
    async changeCountOfProducts({deviceId, countOfProducts}) {
        return instance.post(`api/basket/devices/${deviceId}`, {countOfProducts}).then(res => res)
    }
}