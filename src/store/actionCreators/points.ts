import { Dispatch } from 'redux';
import { PointsAction, PointsActionTypes } from '../../types/actions/points';
import { getPointsToCity } from '../../api/api';

export const fetchPointsForCity = (id: string) => {
  return async (dispatch: Dispatch<PointsAction>) => {
    try {
      dispatch({ type: PointsActionTypes.FETCH_POINTS });
      const response = await getPointsToCity(id);
      dispatch({
        type: PointsActionTypes.FETCH_POINTS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({ type: PointsActionTypes.FETCH_POINTS_ERROR, payload: error });
    }
  };
};
