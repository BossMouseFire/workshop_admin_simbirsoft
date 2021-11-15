export interface IOrderStatus {
  id: string;
  name: string;
}

export interface StatusesState {
  statuses: IOrderStatus[];
  loading: boolean;
  error: null | string;
}

export enum StatusesActionTypes {
  FETCH_STATUSES = 'FETCH_STATUSES',
  FETCH_STATUSES_SUCCESS = 'FETCH_STATUSES_SUCCESS',
  FETCH_STATUSES_ERROR = 'FETCH_STATUSES_ERROR',
}
interface FetchStatusesAction {
  type: StatusesActionTypes.FETCH_STATUSES;
}

interface FetchStatusesActionSuccess {
  type: StatusesActionTypes.FETCH_STATUSES_SUCCESS;
  payload: IOrderStatus[];
}

interface FetchStatusesActionError {
  type: StatusesActionTypes.FETCH_STATUSES_ERROR;
  payload: any;
}

export type StatusesAction =
  | FetchStatusesAction
  | FetchStatusesActionSuccess
  | FetchStatusesActionError;
