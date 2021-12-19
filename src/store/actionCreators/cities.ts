import { Dispatch } from 'redux';
import {
  CitiesAction,
  CitiesActionTypes,
  ICity,
} from '../../types/actions/cities';
import { getCities } from '../../api/api';

export const fetchCities = (page?: number, limit?: number) => {
  return async (dispatch: Dispatch<CitiesAction>) => {
    try {
      dispatch({ type: CitiesActionTypes.FETCH_CITIES });
      const response = await getCities(page, limit);
      dispatch({
        type: CitiesActionTypes.FETCH_CITIES_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({ type: CitiesActionTypes.FETCH_CITIES_ERROR, payload: error });
    }
  };
};

export const addCity = (city: ICity) => {
  return (dispatch: Dispatch<CitiesAction>) => {
    dispatch({
      type: CitiesActionTypes.ADD_CITY,
      payload: city,
    });
  };
};
