import {adminApi} from "../API/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Device, Type, Brand} from './types'

type AdminPageState = {
    type: Type | null,
    brand: Brand | null,
    device: Device | null,
    photo: string | null
}

const initialState: AdminPageState = {
    type: null,
    brand: null,
    device: null,
    photo: null
}

const AdminPageSlice = createSlice({
    name: 'adminPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addDevice.fulfilled, (state, action) => {
            state.device = action.payload
        })
        .addCase(addBrand.fulfilled, (state, action) => {
            state.brand = action.payload
        })
        .addCase(addType.fulfilled, (state, action) => {
            state.type = action.payload
        })
        .addCase(addPhoto.fulfilled, (state, action) => {
            state.photo = action.payload
        })
    }
})

export const addBrand = createAsyncThunk<Brand, Brand, {rejectValue: string}>(
    'api/brand',
    async function ({name}, { rejectWithValue }) {
        const response = await adminApi.addBrand({name})
        if(!response.ok){
            return rejectWithValue('Response error!')
        }
        const brand = await response.json()
        return brand.data as Brand
    }
)

export const addDevice = createAsyncThunk<Device, Device, {rejectValue: string}>(
    'api/device',
    async function ({name, price, typeId, brandId}, { rejectWithValue }) {
        const device = await adminApi.addDevice({name, price, typeId, brandId})
        if(!device.ok){
            return rejectWithValue('Response error!')
        }
        return (await device.data) as Device
    }
)

export const addType = createAsyncThunk<Type, Type, {rejectValue: string}>(
    'api/type',
    async function ({name}, { rejectWithValue }) {
        const type = await adminApi.addType({name})
        if(!type.ok){
            return rejectWithValue('Response error!')
        }
        return (await type.data) as Type
    }
)


export const addPhoto = createAsyncThunk<string, File, { rejectValue: string }>(
    'photo',
    async function (file) {
        const photo = await adminApi.addPhoto(file)
        return (await photo.name) as string
    }
)

export default AdminPageSlice.reducer