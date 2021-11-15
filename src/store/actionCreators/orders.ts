import { Dispatch } from 'redux';
import { OrdersAction, OrdersActionTypes } from '../../types/actions/orders';
import { getOrders, getOrdersByParams } from '../../api/api';

export const fetchOrders = (page: number, limit: number) => {
  return async (dispatch: Dispatch<OrdersAction>) => {
    try {
      dispatch({
        type: OrdersActionTypes.FETCH_ORDERS,
      });
      const response = await getOrders(page, limit);
      dispatch({
        type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
          orders: response.data.data,
          maxCount: response.data.count,
        },
      });
    } catch (e) {
      dispatch({
        type: OrdersActionTypes.FETCH_ORDERS_ERROR,
        payload: e,
      });
    }
  };
};

export const fetchOrdersByParams = (
  page: number,
  limit: number,
  cityId?: string,
  statusId?: string
) => {
  return async (dispatch: Dispatch<OrdersAction>) => {
    try {
      dispatch({
        type: OrdersActionTypes.FETCH_ORDERS,
      });
      const response = await getOrdersByParams(page, limit, cityId, statusId);
      dispatch({
        type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
          orders: response.data.data,
          maxCount: response.data.count,
        },
      });
    } catch (e) {
      dispatch({
        type: OrdersActionTypes.FETCH_ORDERS_ERROR,
        payload: e,
      });
    }
  };
};
