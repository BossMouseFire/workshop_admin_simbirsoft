import { ICity } from '../actions/cities';
import { IOrderStatus } from '../actions/orderStatuses';
import { IOrder } from '../actions/orders';
import { ICar } from '../actions/cars';
import { ICategory } from '../actions/categories';
import { IPoint } from '../actions/points';

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

export interface IResponseCities {
  data: ICity[];
}

export interface IResponseCity {
  data: ICity;
}

export interface IResponseOrderStatuses {
  data: IOrderStatus[];
}

export interface IResponseOrders {
  data: IOrder[];
  count: number;
}

export interface IRequestCars {
  data: ICar[];
  count: number;
}

export interface IRequestCategories {
  data: ICategory[];
}

export interface IRequestPoints {
  data: IPoint[];
}

export interface IResponsePoint {
  data: IPoint;
}

export interface ICarPost {
  name: string;
  description: string;
  categoryId?: ICategory;
  priceMax: number;
  priceMin: number;
  thumbnail: {
    path: string;
    size?: number;
    originalname?: string;
    mimetype?: string;
  };
  number: string;
  colors: string[];
}
