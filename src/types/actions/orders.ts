import { IOrderStatus } from './orderStatuses';
import { ICity } from './cities';
import { ICar, IPoint } from '../api';

export interface IOrder {
  id: string;
  orderStatusId: IOrderStatus;
  cityId?: ICity;
  pointId?: IPoint;
  carId?: ICar;
  color: string;
  dateFrom: number;
  dateTo: number;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}

export interface OrdersState {
  orders: IOrder[];
  maxCount: number;
  loading: boolean;
  error: string | null;
}

export enum OrdersActionTypes {
  FETCH_ORDERS = 'FETCH_ORDERS',
  FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR',
}

interface FetchOrdersAction {
  type: OrdersActionTypes.FETCH_ORDERS;
}

interface FetchOrdersActionSuccess {
  type: OrdersActionTypes.FETCH_ORDERS_SUCCESS;
  payload: {
    orders: IOrder[];
    maxCount: number;
  };
}

interface FetchOrdersActionError {
  type: OrdersActionTypes.FETCH_ORDERS_ERROR;
  payload: any;
}

export type OrdersAction =
  | FetchOrdersAction
  | FetchOrdersActionSuccess
  | FetchOrdersActionError;
