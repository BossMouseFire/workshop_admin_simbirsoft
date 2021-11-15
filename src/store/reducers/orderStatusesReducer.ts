import {
  StatusesAction,
  StatusesActionTypes,
  StatusesState,
} from '../../types/actions/orderStatuses';

const initialState: StatusesState = {
  statuses: [],
  loading: false,
  error: null,
};

export const statusesReducer = (
  state = initialState,
  action: StatusesAction
): StatusesState => {
  switch (action.type) {
    case StatusesActionTypes.FETCH_STATUSES:
      return { statuses: [], loading: true, error: null };
    case StatusesActionTypes.FETCH_STATUSES_SUCCESS:
      return { statuses: action.payload, loading: false, error: null };
    case StatusesActionTypes.FETCH_STATUSES_ERROR:
      return { statuses: [], loading: false, error: action.payload };
    default:
      return state;
  }
};
