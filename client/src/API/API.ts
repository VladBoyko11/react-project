import axios, { AxiosResponse } from 'axios'
import { Brand, Device, Login, Photo, Rating, Type } from '../redux/types'

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
    getDevices(params: deviceApiParams) {
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
    getBrands(params?: deviceApiParams) {
        if(!params) {
            return instance.get('/api/brand').then(response => response)
        }
        if(params.brandId) {
            return instance.get(`api/brand/${params.brandId}`).then(response => response)
        }
        return instance.get(`/api/brand${params}`).then(response => response)
    },
    getTypes(params?: deviceApiParams) {
        if(!params) return instance.get('/api/type').then(response => response)
        if(!params.typeName) return instance.get('/api/type').then(response => response)
        else return instance.get(`/api/type/${params.typeName}`).then(response => response)
    },
    addYourDeviceRating(rating: number, userId: number, deviceId: number) {
        return instance.post('api/rating', {userId, deviceId, rate: rating}).then(res => res)
    },
    getDeviceDescription(deviceId: string) {
        return instance.get(`api/device/description/${deviceId}`).then(res => res)
    },
    getDevicesByIds(deviceIds: Array<number>) {
        return instance.get(`api/device/deviceIds?deviceIds=${deviceIds}`).then(res => res)
    }
}

export const loginAPI = {
    login(email: string, password: string) {
        return instance.post('api/user/login', {email, password}).then(res => res)
    },
    auth(){
        return instance.get('api/user/auth').then(res => res).catch(err => err)
    },
    registration(email: string, password: string) {
        return instance.post('api/user/registration', {email, password}).then(res => res)
    },
    getYourRatings (userId: number) {
        return instance.get(`api/rating/user/${userId}`).then(res => res)
    },
    setNewEmail (email: string, id: number) {
        return instance.post('api/user/newEmail', {email, id}).then(res => res) 
    }
}

// interface adminApiData {
//     file?: Blob | string,
//     addType(name: string): Promise<AxiosResponse>
//     addBrand(name: string): Promise<AxiosResponse>
//     addDevice({name, price, brandId, typeId}: {name: string, price: number, brandId: number, typeId: number}):  Device
//     addPhoto(file: Blob | string): void
// }

type adminApiType = {
    file: Blob | string, 
    addType ({name}: Type): any,
    addBrand ({name}: Brand): any,
    addDevice ({name, price, brandId, typeId}: Device): any,
    addPhoto (File: Blob | string): any
}

export const adminApi: adminApiType = {
    file:  '',
    addType({name}: Type) {
        return instance.post('/api/type', {name}) as unknown as Type
    },
    addBrand({name}: Brand) {
        return instance.post('/api/brand', {name}) as unknown as Brand
    },
    addDevice({name, price, brandId, typeId}: Device) {
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
        }) as unknown as Device
    },
    addPhoto(File: Blob | string) {
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
    getBasket(params) {
        return instance.get(`/api/basket/${params.userId}`).then(res => res)
    },
    addDeviceToBasket(params){
        return instance.post(`api/basket/${params.basketId}?deviceId=${params.deviceId}`).then(res => res)
    },
    getDevicesFromBasket(params){
        return instance.get(`api/basket/devices/${params.basketId}`).then(res => res)
    },
    deleteDeviceFromBasket(params) {
        return instance.delete(`api/basket/${params.basketId}?deviceId=${params.deviceId}`).then(res => res)
    },
    changeCountOfProducts({deviceId, countOfProducts}) {
        return instance.post(`api/basket/devices/${deviceId}`, {countOfProducts}).then(res => res)
    }
}