import { ICategory } from './categories';

export interface ICar {
  id: string;
  name: string;
  description: string;
  categoryId?: ICategory;
  priceMax: number;
  priceMin: number;
  thumbnail: {
    path: string;
  };
  number: string;
  tank: number;
  colors: string[];
}
export interface ICarCard {
  car: ICar;
}

export interface CarsState {
  cars: ICar[];
  maxCount: number;
  loading: boolean;
  error: string | null;
}

export enum CarsActionTypes {
  FETCH_CARS = 'FETCH_CARS',
  FETCH_CARS_SUCCESS = 'FETCH_CARS_SUCCESS',
  FETCH_CARS_ERROR = 'FETCH_CARS_ERROR',
}

interface FetchCarsAction {
  type: CarsActionTypes.FETCH_CARS;
}

interface FetchCarsActionSuccess {
  type: CarsActionTypes.FETCH_CARS_SUCCESS;
  payload: {
    cars: ICar[];
    maxCount: number;
  };
}

interface FetchCarsActionError {
  type: CarsActionTypes.FETCH_CARS_ERROR;
  payload: any;
}

export type CarsAction =
  | FetchCarsAction
  | FetchCarsActionSuccess
  | FetchCarsActionError;
