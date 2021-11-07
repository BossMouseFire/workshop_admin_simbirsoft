export interface IRequestAuth {
  token_type: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
  user_id: string;
}
export interface IResponseCheck {
  id: string;
  username: string;
  role: {
    id: string;
    name: string;
  };
}
export interface AuthState {
  isAuthenticated: boolean;
  dataAuth: IResponseCheck;
  loading: boolean;
  error: null | string;
}

export enum AuthActionTypes {
  AUTH_LOADING = 'AUTH_LOADING',
  AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_ERROR = 'AUTH_ERROR',
  AUTH_CHECK_SUCCESS = 'AUTH_CHECK_SUCCESS',
  AUTH_CHECK_ERROR = 'AUTH_CHECK_ERROR',
}

interface AuthLoadingAction {
  type: AuthActionTypes.AUTH_LOADING;
}

interface AuthLoginSuccessAction {
  type: AuthActionTypes.AUTH_LOGIN_SUCCESS;
}

interface AuthLoginErrorAction {
  type: AuthActionTypes.AUTH_LOGIN_ERROR;
  payload: any;
}

interface AuthCheckSuccessAction {
  type: AuthActionTypes.AUTH_CHECK_SUCCESS;
  payload: IResponseCheck;
}

interface AuthCheckErrorAction {
  type: AuthActionTypes.AUTH_CHECK_ERROR;
}

export type AuthAction =
  | AuthLoadingAction
  | AuthLoginSuccessAction
  | AuthLoginErrorAction
  | AuthCheckSuccessAction
  | AuthCheckErrorAction;
