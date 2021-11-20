export interface ICity {
  id: string;
  name: string;
}

export interface CitiesState {
  cities: ICity[];
  loading: boolean;
  error: null | string;
}

export enum CitiesActionTypes {
  FETCH_CITIES = 'FETCH_CITIES',
  FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS',
  FETCH_CITIES_ERROR = 'FETCH_CITIES_ERROR',
}
interface FetchCitiesAction {
  type: CitiesActionTypes.FETCH_CITIES;
}

interface FetchCitiesActionSuccess {
  type: CitiesActionTypes.FETCH_CITIES_SUCCESS;
  payload: ICity[];
}

interface FetchCitiesActionError {
  type: CitiesActionTypes.FETCH_CITIES_ERROR;
  payload: any;
}

export type CitiesAction =
  | FetchCitiesAction
  | FetchCitiesActionSuccess
  | FetchCitiesActionError;
