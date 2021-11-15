import { ICity } from '../actions/cities';
import { IOrderStatus } from '../actions/orderStatuses';
import { IOrder } from '../actions/orders';

export interface IRequestAuth {
  token_type: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
  user_id: string;
}
export interface IResponseCheck {
  id: string;
  username: string;
  role: {
    id: string;
    name: string;
  };
}

export interface IResponseCars {
  data: ICity[];
}

export interface IResponseOrderStatuses {
  data: IOrderStatus[];
}

export interface IPoint {
  id: string;
  name: string;
  address: string;
}

interface ICategory {
  id: string;
  name: string;
  description: string;
}

export interface ICar {
  id: string;
  name: string;
  description: string;
  categoryId: ICategory;
  priceMax: number;
  priceMin: number;
  thumbnail: {
    path: string;
  };
  number: string;
  tank: number;
  colors: string[];
}

export interface IResponseOrders {
  data: IOrder[];
}
