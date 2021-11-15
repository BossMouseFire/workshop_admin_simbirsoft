import { Dispatch } from 'redux';
import { OrdersAction, OrdersActionTypes } from '../../types/actions/orders';
import { getOrders } from '../../api/api';

export const fetchOrders = (page: number, limit: number) => {
  return async (dispatch: Dispatch<OrdersAction>) => {
    try {
      dispatch({
        type: OrdersActionTypes.FETCH_ORDERS,
      });
      const response = await getOrders(page, limit);
      dispatch({
        type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
        payload: response.data.data,
      });
    } catch (e) {
      dispatch({
        type: OrdersActionTypes.FETCH_ORDERS_ERROR,
        payload: e,
      });
    }
  };
};
