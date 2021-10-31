import {
  AuthAction,
  AuthActionTypes,
  AuthState,
  IRequestAuth,
} from '../../types/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  dataAuth: {} as IRequestAuth,
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
        isAuthenticated: action.payload.isAuthenticated,
        dataAuth: action.payload.dataAuth,
        loading: false,
        error: null,
      };
    case AuthActionTypes.AUTH_LOGIN_ERROR:
      return {
        isAuthenticated: false,
        dataAuth: {} as IRequestAuth,
        loading: false,
        error: action.payload,
      };
    case AuthActionTypes.AUTH_CHECK_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AuthActionTypes.AUTH_CHECK_ERROR:
      return {
        isAuthenticated: false,
        dataAuth: {} as IRequestAuth,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
