import {
  OrdersAction,
  OrdersActionTypes,
  OrdersState,
} from '../../types/actions/orders';

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

export const ordersReducer = (
  state = initialState,
  action: OrdersAction
): OrdersState => {
  switch (action.type) {
    case OrdersActionTypes.FETCH_ORDERS:
      return { orders: [], loading: true, error: null };
    case OrdersActionTypes.FETCH_ORDERS_SUCCESS:
      return { orders: action.payload, loading: false, error: null };
    case OrdersActionTypes.FETCH_ORDERS_ERROR:
      return { orders: [], loading: false, error: action.payload };
    default:
      return state;
  }
};
