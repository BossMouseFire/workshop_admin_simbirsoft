export interface ICategory {
  id: string;
  name: string;
  description: string;
}

export interface CategoriesState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

export enum CategoriesActionTypes {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR',
}

interface FetchCategoriesAction {
  type: CategoriesActionTypes.FETCH_CATEGORIES;
}

interface FetchCategoriesActionSuccess {
  type: CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS;
  payload: ICategory[];
}

interface FetchCategoriesActionError {
  type: CategoriesActionTypes.FETCH_CATEGORIES_ERROR;
  payload: any;
}

export type CategoriesAction =
  | FetchCategoriesAction
  | FetchCategoriesActionSuccess
  | FetchCategoriesActionError;
