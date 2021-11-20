import {
  CitiesAction,
  CitiesActionTypes,
  CitiesState,
} from '../../types/actions/cities';

const initialState: CitiesState = {
  cities: [],
  loading: false,
  error: null,
};

export const citiesReducer = (
  state = initialState,
  action: CitiesAction
): CitiesState => {
  switch (action.type) {
    case CitiesActionTypes.FETCH_CITIES:
      return { cities: [], loading: true, error: null };
    case CitiesActionTypes.FETCH_CITIES_SUCCESS:
      return { cities: action.payload, loading: false, error: null };
    case CitiesActionTypes.FETCH_CITIES_ERROR:
      return { cities: [], loading: false, error: action.payload };
    default:
      return state;
  }
};
