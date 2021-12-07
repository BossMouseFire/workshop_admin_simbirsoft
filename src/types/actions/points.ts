export interface IPoint {
  address: string;
  name: string;
  cityId: {
    name: string;
    id: string;
  };
  id: string;
}

export interface PointsState {
  points: IPoint[];
  loading: boolean;
  error: null | string;
}

export enum PointsActionTypes {
  FETCH_POINTS = 'FETCH_POINTS',
  FETCH_POINTS_SUCCESS = 'FETCH_POINTS_SUCCESS',
  FETCH_POINTS_ERROR = 'FETCH_POINTS_ERROR',
  ADD_POINT = 'ADD_POINT',
}
interface FetchCitiesAction {
  type: PointsActionTypes.FETCH_POINTS;
}

interface FetchCitiesActionSuccess {
  type: PointsActionTypes.FETCH_POINTS_SUCCESS;
  payload: IPoint[];
}

interface FetchCitiesActionError {
  type: PointsActionTypes.FETCH_POINTS_ERROR;
  payload: any;
}

interface AddPointAction {
  type: PointsActionTypes.ADD_POINT;
  payload: IPoint;
}

export type PointsAction =
  | FetchCitiesAction
  | FetchCitiesActionSuccess
  | FetchCitiesActionError
  | AddPointAction;
