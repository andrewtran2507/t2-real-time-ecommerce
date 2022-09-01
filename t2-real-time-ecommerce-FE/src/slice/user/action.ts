import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userApi from "services/api/users";
import { IPayloadLogin } from "./types";


export const login = createAsyncThunk(
    "auth/login",
    async (dataLogin: IPayloadLogin, thunkApi) => {
        try {
            const data = await userApi.login(dataLogin);
            console.log(data)
            if (data.data.token != null) {
                localStorage.setItem("accessToken", data.data.token);
                localStorage.setItem("roleName", data.data.role.name);
            }
            return data.data
        } catch (error: any) {
            // alert(error.response.data.message)
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const getProductList = createAsyncThunk(
    "auth/getProductList",
    async (params: any, thunkApi) => {
        try {
            const data = await userApi.getProductList(params);
            return data.data
        } catch (error: any) {
            // alert(error.response.data.message)
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const filterProductList = createAsyncThunk(
    "auth/filterProductList",
    async (filterPayload: any, thunkApi) => {
        try {
            const data = await userApi.filterProductList(filterPayload);
            return data.data
        } catch (error: any) {
            // alert(error.response.data.message)
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const getProductColor = createAsyncThunk(
    "auth/geProductColor",
    async (thunkApi) => {
        try {
            const data = await userApi.getProductColor();
            return data.data
        } catch (error: any) {
            // // alert(error.response.data.message);
        }
    }
);
export const getCategoryList = createAsyncThunk(
    "auth/getCategoryList",
    async (thunkApi) => {
        try {
            const data = await userApi.getCategoryList();
            return data.data
        } catch (error: any) {
            // // alert(error.response.data.message);
        }
    }
);
export const getBrandList = createAsyncThunk(
    "auth/getBrandList",
    async (thunkApi) => {
        try {
            const data = await userApi.getBrandList();
            return data.data
        } catch (error: any) {
            // // alert(error.response.data.message);
        }
    }
);

export const placeOrder = createAsyncThunk(
    "auth/placeOrder",
    async (orderPayload:any , thunkApi) => {
        try {
            const data = await userApi.placeOrder(orderPayload);
            return data.data
        } catch (error: any) {
            // // alert(error.response.data.message);
        }
    }
);

export const orderDetailsByUser = createAsyncThunk(
    "auth/orderDetailsByUser",
    async (_, thunkApi) => {
        try {
            const data = await userApi.orderDetailsByUser();
            return data.data
        } catch (error: any) {
            // alert(error.response.data.message)
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const orderDetailsUpdateStatus = createAsyncThunk(
    "auth/orderDetailsUpdateStatus",
    async (payload: any, thunkApi) => {
        try {
            const data = await userApi.orderDetailsUpdateStatus(payload);
            return data.data
        } catch (error: any) {
            // alert(error.response.data.message)
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);