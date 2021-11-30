import { Dispatch } from 'redux';
import { CarsAction, CarsActionTypes } from '../../types/actions/cars';
import { getCars, getCarsByParams } from '../../api/api';

export const fetchCars = (page: number, limit: number) => {
  return async (dispatch: Dispatch<CarsAction>) => {
    try {
      dispatch({ type: CarsActionTypes.FETCH_CARS });
      const response = await getCars(page, limit);
      dispatch({
        type: CarsActionTypes.FETCH_CARS_SUCCESS,
        payload: {
          cars: response.data.data,
          maxCount: response.data.count,
        },
      });
    } catch (error) {
      dispatch({ type: CarsActionTypes.FETCH_CARS_ERROR, payload: error });
    }
  };
};

export const fetchCarsByParams = (
  page: number,
  limit: number,
  categoryId?: string
) => {
  return async (dispatch: Dispatch<CarsAction>) => {
    try {
      dispatch({ type: CarsActionTypes.FETCH_CARS });
      const response = await getCarsByParams(page, limit, categoryId);
      dispatch({
        type: CarsActionTypes.FETCH_CARS_SUCCESS,
        payload: {
          cars: response.data.data,
          maxCount: response.data.count,
        },
      });
    } catch (error) {
      dispatch({ type: CarsActionTypes.FETCH_CARS_ERROR, payload: error });
    }
  };
};
