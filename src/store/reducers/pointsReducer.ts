import {
  PointsAction,
  PointsActionTypes,
  PointsState,
} from '../../types/actions/points';

const initialState: PointsState = {
  points: [],
  loading: false,
  error: null,
};

export const pointsReducer = (
  state = initialState,
  action: PointsAction
): PointsState => {
  switch (action.type) {
    case PointsActionTypes.FETCH_POINTS:
      return { points: [], loading: true, error: null };
    case PointsActionTypes.FETCH_POINTS_SUCCESS:
      return { points: action.payload, loading: false, error: null };
    case PointsActionTypes.FETCH_POINTS_ERROR:
      return { points: [], loading: false, error: action.payload };
    default:
      return state;
  }
};
