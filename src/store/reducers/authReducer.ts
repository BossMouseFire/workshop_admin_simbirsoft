import {
  AuthAction,
  AuthActionTypes,
  AuthState,
} from '../../types/actions/auth';

import { IResponseCheck } from '../../types/api';

const initialState: AuthState = {
  isAuthenticated: false,
  dataAuth: {} as IResponseCheck,
  loading: false,
  error: null,
};

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.AUTH_LOADING:
      return { ...state, loading: true };
    case AuthActionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AuthActionTypes.AUTH_LOGIN_ERROR:
      return {
        isAuthenticated: false,
        dataAuth: {} as IResponseCheck,
        loading: false,
        error: action.payload,
      };
    case AuthActionTypes.AUTH_CHECK_SUCCESS:
      return {
        isAuthenticated: true,
        dataAuth: action.payload,
        loading: false,
        error: null,
      };
    case AuthActionTypes.AUTH_CHECK_ERROR:
      return {
        isAuthenticated: false,
        dataAuth: {} as IResponseCheck,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
