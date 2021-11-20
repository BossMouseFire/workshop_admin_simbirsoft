import { Dispatch } from 'redux';
import {
  StatusesAction,
  StatusesActionTypes,
} from '../../types/actions/orderStatuses';
import { getOrderStatuses } from '../../api/api';

export const fetchStatuses = () => {
  return async (dispatch: Dispatch<StatusesAction>) => {
    try {
      dispatch({
        type: StatusesActionTypes.FETCH_STATUSES,
      });
      const response = await getOrderStatuses();
      dispatch({
        type: StatusesActionTypes.FETCH_STATUSES_SUCCESS,
        payload: response.data.data,
      });
    } catch (e) {
      dispatch({
        type: StatusesActionTypes.FETCH_STATUSES_ERROR,
        payload: e,
      });
    }
  };
};
