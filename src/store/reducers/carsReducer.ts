import {
  CarsAction,
  CarsActionTypes,
  CarsState,
} from '../../types/actions/cars';

const initialState: CarsState = {
  cars: [],
  maxCount: 0,
  loading: false,
  error: null,
};

export const carsReducer = (
  state = initialState,
  action: CarsAction
): CarsState => {
  switch (action.type) {
    case CarsActionTypes.FETCH_CARS:
      return { cars: [], maxCount: 0, loading: true, error: null };
    case CarsActionTypes.FETCH_CARS_SUCCESS:
      return {
        cars: action.payload.cars,
        maxCount: action.payload.maxCount,
        loading: false,
        error: null,
      };
    case CarsActionTypes.FETCH_CARS_ERROR:
      return { cars: [], maxCount: 0, loading: false, error: action.payload };
    default:
      return state;
  }
};
