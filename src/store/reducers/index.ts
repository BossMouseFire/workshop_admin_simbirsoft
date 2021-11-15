import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { citiesReducer } from './citiesReducer';
import { statusesReducer } from './orderStatusesReducer';
import { ordersReducer } from './ordersReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  cities: citiesReducer,
  orderStatuses: statusesReducer,
  orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
