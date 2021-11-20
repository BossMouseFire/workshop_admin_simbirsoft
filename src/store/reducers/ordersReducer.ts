import {
  OrdersAction,
  OrdersActionTypes,
  OrdersState,
} from '../../types/actions/orders';

const initialState: OrdersState = {
  orders: [],
  maxCount: 0,
  loading: false,
  error: null,
};

export const ordersReducer = (
  state = initialState,
  action: OrdersAction
): OrdersState => {
  switch (action.type) {
    case OrdersActionTypes.FETCH_ORDERS:
      return { orders: [], maxCount: 0, loading: true, error: null };
    case OrdersActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        orders: action.payload.orders,
        maxCount: action.payload.maxCount,
        loading: false,
        error: null,
      };
    case OrdersActionTypes.FETCH_ORDERS_ERROR:
      return { orders: [], maxCount: 0, loading: false, error: action.payload };
    default:
      return state;
  }
};
