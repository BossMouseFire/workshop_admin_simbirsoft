import { Dispatch } from 'redux';
import {
  CategoriesAction,
  CategoriesActionTypes,
} from '../../types/actions/categories';
import { getCategories } from '../../api/api';

export const fetchCategories = () => {
  return async (dispatch: Dispatch<CategoriesAction>) => {
    try {
      dispatch({ type: CategoriesActionTypes.FETCH_CATEGORIES });
      const response = await getCategories();
      dispatch({
        type: CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: CategoriesActionTypes.FETCH_CATEGORIES_ERROR,
        payload: error,
      });
    }
  };
};
