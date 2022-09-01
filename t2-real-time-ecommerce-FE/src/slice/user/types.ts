export interface IUserState {
  loading: boolean,
    accessToken: string,
    currentProductList: any[],
    productColor: any[],
    brandList: any[],
    categoryList: any[],
    userInfo: any,
    orderDetailsByUserList: any,
    orderDetailsItem: any,
    notificationAlert: any,
}
export interface IPayloadLogin {
  email: string;
  password: string;
}
