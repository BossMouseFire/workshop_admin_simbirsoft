import {
  CategoriesAction,
  CategoriesActionTypes,
  CategoriesState,
} from '../../types/actions/categories';

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoriesReducer = (
  state = initialState,
  action: CategoriesAction
): CategoriesState => {
  switch (action.type) {
    case CategoriesActionTypes.FETCH_CATEGORIES:
      return { categories: [], loading: true, error: null };
    case CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
      return { categories: action.payload, loading: false, error: null };
    case CategoriesActionTypes.FETCH_CATEGORIES_ERROR:
      return { categories: [], loading: false, error: action.payload };
    default:
      return state;
  }
};
