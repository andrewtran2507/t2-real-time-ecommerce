import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  getProductList,
  filterProductList,
  getProductColor,
  placeOrder,
  getCategoryList,
  getBrandList,
  orderDetailsByUser,
  orderDetailsUpdateStatus
} from "./action";
import { IUserState } from "./types";

const initialState: IUserState = {
  loading: false,
  accessToken: "",
  currentProductList: [],
  productColor: [],
  brandList: [],
  categoryList: [],
  userInfo: {},
  orderDetailsByUserList: {},
  orderDetailsItem: {},
  notificationAlert: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state: IUserState, action) => {
      state.accessToken = action.payload.accessToken;
    },
    logout: (state: IUserState) => {
      state.accessToken = "";
      state.userInfo = {};
    },
    setNotificationAlert: (state: IUserState, action) => {
      state.notificationAlert = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //#region login
      .addCase(login.pending, (state: any) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state: any, action: any) => {
        state.loading = false
        state.accessToken = action.payload.token
        state.userInfo = {name: action.payload.name, email: action.payload.email, id: action.payload.id}
      })
      .addCase(login.rejected, (state: any, action: any) => {
        state.loading = false
        state.accessToken = null
      })
    //#endregion
    // productList
    .addCase(getProductList.pending, (state: any) => {
      state.loading = true
    })
    .addCase(getProductList.fulfilled, (state: any, action: any) => {
      state.loading = false
      state.currentProductList = action.payload
    })
    .addCase(getProductList.rejected, (state: any, action: any) => {
      state.loading = false
      state.currentProductList = null
    })
    // filterList
    .addCase(filterProductList.pending, (state: any) => {
      state.loading = true
    })
    .addCase(filterProductList.fulfilled, (state: any, action: any) => {
      state.loading = false
      state.currentProductList = action.payload
    })
    .addCase(filterProductList.rejected, (state: any, action: any) => {
      state.loading = false
      state.currentProductList = null
    })
    // productColor
    .addCase(getProductColor.pending, (state: any) => {
      state.loading = true
    })
    .addCase(getProductColor.fulfilled, (state: any, action: any) => {
      state.loading = false
      state.productColor = action.payload
    })
    .addCase(getProductColor.rejected, (state: any, action: any) => {
      state.loading = false
      state.productColor = null
    })
    // placeOrder
    .addCase(placeOrder.pending, (state: any) => {
      state.loading = true
    })
    .addCase(placeOrder.fulfilled, (state: any, action: any) => {
      state.loading = false
    })
    .addCase(placeOrder.rejected, (state: any, action: any) => {
      state.loading = false
    })
    //getCategoryList
    .addCase(getCategoryList.pending, (state: any) => {
      state.loading = true
    })
    .addCase(getCategoryList.fulfilled, (state: any, action: any) => {
      state.loading = false
      state.categoryList = action.payload
    })
    .addCase(getCategoryList.rejected, (state: any, action: any) => {
      state.loading = false
    })
    //getBrandList
    .addCase(getBrandList.pending, (state: any) => {
      state.loading = true
    })
    .addCase(getBrandList.fulfilled, (state: any, action: any) => {
      state.loading = false
      state.brandList = action.payload
    })
    .addCase(getBrandList.rejected, (state: any, action: any) => {
      state.loading = false
    })

    //orderDetailsByUser
    .addCase(orderDetailsByUser.pending, (state: any) => {
      state.loading = true
    })
    .addCase(orderDetailsByUser.fulfilled, (state: any, action: any) => {
      state.loading = false
      state.orderDetailsByUserList = action.payload
    })
    .addCase(orderDetailsByUser.rejected, (state: any, action: any) => {
      state.loading = false
    })

    //orderDetailsUpdateStatus
    .addCase(orderDetailsUpdateStatus.pending, (state: any) => {
      state.loading = true
    })
    .addCase(orderDetailsUpdateStatus.fulfilled, (state: any, action: any) => {
      state.loading = false
      state.orderDetailsItem = action.payload
    })
    .addCase(orderDetailsUpdateStatus.rejected, (state: any, action: any) => {
      state.loading = false
    })
    
  }
});

export const { reducer: userReducer } = userSlice;

export const { setAccessToken, logout, setNotificationAlert } = userSlice.actions;
