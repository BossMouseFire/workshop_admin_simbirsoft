import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { citiesReducer } from './citiesReducer';
import { statusesReducer } from './orderStatusesReducer';
import { ordersReducer } from './ordersReducer';
import { carsReducer } from './carsReducer';
import { categoriesReducer } from './categoriesReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  cities: citiesReducer,
  orderStatuses: statusesReducer,
  orders: ordersReducer,
  cars: carsReducer,
  categories: categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
