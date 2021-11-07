import {
  AuthAction,
  AuthActionTypes,
  AuthState,
  IResponseCheck,
} from '../../types/auth';

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
