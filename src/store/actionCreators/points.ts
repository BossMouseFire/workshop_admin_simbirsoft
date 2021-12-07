import { Dispatch } from 'redux';
import {
  IPoint,
  PointsAction,
  PointsActionTypes,
} from '../../types/actions/points';
import { getPointsToCities, getPointsToCity } from '../../api/api';

export const fetchPointsToCity = (id: string) => {
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

export const fetchPointsToCities = (ids: string[]) => {
  return async (dispatch: Dispatch<PointsAction>) => {
    try {
      dispatch({ type: PointsActionTypes.FETCH_POINTS });
      const response = await getPointsToCities(ids);
      dispatch({
        type: PointsActionTypes.FETCH_POINTS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({ type: PointsActionTypes.FETCH_POINTS_ERROR, payload: error });
    }
  };
};

export const addPoint = (point: IPoint) => {
  return (dispatch: Dispatch<PointsAction>) => {
    dispatch({
      type: PointsActionTypes.ADD_POINT,
      payload: point,
    });
  };
};
