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
    reducers: {
        // addNewType (state, action: PayloadAction<Type>) {
        //     state.type = action.payload
        // },
        // addNewBrand (state, action: PayloadAction<Brand>) {
        //     state.brand = action.payload
        // },
        // addNewDevice (state, action: PayloadAction<Device>) {
        //     state.device = {
        //         name: action.payload.name,
        //         price: action.payload.price
        //     }
        // }
    },
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
        const brand = await adminApi.addBrand({name})
        if(!brand.ok){
            return rejectWithValue('Response error!')
        }
        return (await brand.data) as Brand
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
// let initialState = {
//     type: null,
//     brand: null,
//     device: []
// }

// const AdminPageReducer = (state = initialState, action) => {
//     const ADD_NEW_TYPE = 'ADD_NEW_TYPE'
//     const ADD_NEW_BRAND = 'ADD_NEW_BRAND'
//     const ADD_NEW_DEVICE = 'ADD_NEW_DEVICE'
//     switch (action.type){
//         case ADD_NEW_TYPE: return {...state, typeName: action.type}
//         case ADD_NEW_BRAND: return {...state, brandName: action.brand}
//         case ADD_NEW_DEVICE: return {...state, device: action.device}
//         default: return state
//     }
// }


// export const addType = (typeName: string) => (dispatch: AppDispatch) => {
//     adminApi.addType(typeName).then(response => {
//         if(response.status === 200) {
//             dispatch(AdminPageSlice.actions.addNewType({name: typeName}))
//         } else {
//             dispatch(stopSubmit("addNewType", {_error: response.data.messages[0]}))
//         }
//     })
// }

// export const addBrand = (brandName: string) => (dispatch: AppDispatch) => {
//     adminApi.addBrand(brandName).then(response => {
//         if(response.status === 200) {
//             dispatch(AdminPageSlice.actions.addNewBrand({name: brandName}))
//         } else {
//             dispatch(stopSubmit("addNewBrand", {_error: response.data.messages[0]}))
//         }
//     })
// }

// export const addDevice = (name: string, price: number, brand: string, type: string) => (dispatch: AppDispatch) => {
//     adminApi.addDevice(name, price, brand, type).then((response: Device) => {
//         if(response.status === 200) {
//             const {id, name, price, rating, img, typeId, brandId} = response
//             dispatch(AdminPageSlice.actions.addNewDevice({id, name, price, rating, img, typeId, brandId}))
//         } else {
//             dispatch(stopSubmit("addNewBrand", {_error: response.data.messages[0]}))
//         }
//     })
// }

// const setType = (typeName: string) => ({type: 'ADD_NEW_TYPE', typeName})

// const setBrand = (brandName: string) => ({type: 'ADD_NEW_BRAND', brandName})

// const setDevice = (device: Device) => ({type: 'ADD_NEW_BRAND', device})

export default AdminPageSlice.reducer