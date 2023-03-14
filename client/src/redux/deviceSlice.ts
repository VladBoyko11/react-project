import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {deviceApi} from "../API/API";
import { Brand, Device, DeviceInfo, Rating, Type } from "./types";

type deviceSliceType = {
    types: Array<Type>,
    brands: Array<Brand>,
    devices: Array<Device>,
    device: Device,
    brand: Brand,
    type: Type,
    totalCount: number,
    limit: number,
    currentPage: number,
    isFetching: boolean,
    deviceDescriptions: Array<DeviceInfo>
}

const initialState: deviceSliceType = {
    types: [],
    brands: [],
    devices: [],
    device: {},
    brand: {},
    type: {},
    totalCount: 0,
    limit: 6,
    currentPage: 1,
    isFetching: false,
    deviceDescriptions: []
}

const deviceSlice = createSlice({
    name: 'devicesPage',
    initialState,
    reducers: {
        // setDevices(state, action: PayloadAction<[]>) {
        //     state.devices.push(...action.payload)
        // },
        // setDevice(state, action: PayloadAction<{name: string, price: number}>) {
        //     state.device = {
        //         name: action.payload.name,
        //         price: action.payload.price
        //     }
        // },
        // setBrands(state, action: PayloadAction<Array<string>>) {
        //     state.brands.push(...action.payload)
        // },
        // setBrand(state, action: PayloadAction<{}>) {
        //     state.brand = action.payload
        // },
        // setTypes(state, action: PayloadAction<Array<string>>) {
        //     state.types.push(...action.payload)
        // },
        setType(state, action: PayloadAction<object>) {
            state.type = action.payload
        },
        // setDeviceDescriptions(state, action: PayloadAction<[]>) {
        //     state.deviceDescriptions.push(...action.payload)
        // },
        setCurrentPage(state, action: PayloadAction<{page: number}>) {
            state.currentPage = action.payload.page
        },
        setTotalCount(state, action: PayloadAction<number>) {
            state.totalCount = action.payload
        },
        setToggleIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getDeviceThunk.fulfilled, (state, action) => {
            state.device = action.payload
        })
        .addCase(getDevicesThunk.fulfilled, (state, action) => {
            state.totalCount = action.payload.count
            state.devices = action.payload.rows
        })
        .addCase(getBrandThunk.fulfilled, (state, action) => {
            state.brand = action.payload
        })
        .addCase(getBrandsThunk.fulfilled, (state, action) => {
            state.brands = action.payload
        })
        .addCase(getTypeThunk.fulfilled, (state, action) => {
            state.type = action.payload
        })
        .addCase(getTypesThunk.fulfilled, (state, action) => {
            state.types = action.payload
        })
        .addCase(addYourDeviceRatingThunk.fulfilled, (state, action) => {
            state.device.rating = action.payload
        })
    }
})

export const getDeviceThunk = createAsyncThunk<Device, {deviceId: number}, {rejectValue: string}>(
    'getOneDevice',
    async function ({deviceId}) {
      const response = await deviceApi.getDevices({ deviceId })
      return response.data as Device
    }
  )

export const getDevicesThunk = createAsyncThunk<{
    count: number,
    rows: Array<Device>
}, {brandId?: number, typeId?: number, limit: number, page: number}, {rejectValue: string}>(
    'getDevices',
    async function ({brandId, typeId, limit, page}) {
        // const dispatch = useAppDispatch()
        // dispatch(deviceSlice.actions.setToggleIsFetching(true))
        const response = await deviceApi.getDevices({brandId, typeId, limit, page})
        return response.data as {
            count: number,
            rows: Array<Device>
        }
    }
)

export const setCurrentPage = ({page}: {page: number}) => {
    return deviceSlice.actions.setCurrentPage({page})
}

export const toggleIsFetching = (data: boolean) => {
    return {type: 'setToggleIsFetching', data}
}

export const getBrandsThunk = createAsyncThunk<Array<Brand>, undefined, {rejectValue: string}>(
    'getBrandsThunk',
    async function () {
        const response = await deviceApi.getBrands()
        return response.data as Array<Brand>
    }
)

export const getBrandThunk = createAsyncThunk<Brand, {brandId: number}, {rejectValue: string}>(
    'getBrandThunk',
    async function ({brandId}) {
        const response = await deviceApi.getBrands({brandId})
        return response.data as Brand
    }
)

export const deleteType = () => deviceSlice.actions.setType({})

export const getTypesThunk = createAsyncThunk<Array<Type>, {typeName?: string}, {rejectValue: string}>(
    'getTypes',
    async function ({typeName}) {
        const response = await deviceApi.getTypes({typeName})
        return response.data as Array<Type>
    }
)

export const getTypeThunk = createAsyncThunk<Type, {typeId?: number, typeName?: string}, {rejectValue: string}>(
    'getType',
    async function ({typeId, typeName}) {
        let response 
        if(typeName) response = await deviceApi.getTypes({typeName})
        if(typeId) response = await deviceApi.getTypes({typeId})
        if(response) return response.data as Type
        return {}
    }
)

export const addYourDeviceRatingThunk = createAsyncThunk<number, {rating: number, userId: number, deviceId: number}, {rejectValue: string}>(
    'addYourDeviceRating',
    async function ({rating, userId, deviceId}) {
        const response = await deviceApi.addYourDeviceRating(rating, userId, deviceId)
        return response.data as number
    }
)

export default deviceSlice.reducer