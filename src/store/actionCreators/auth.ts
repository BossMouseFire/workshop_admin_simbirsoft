import { Dispatch } from 'redux';
import { AuthAction, AuthActionTypes } from '../../types/auth';
import { authCheck, loginRequest } from '../../api/api';
import { setCookie } from '../../utils/utils';

export const login = (login: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: AuthActionTypes.AUTH_LOADING });
      const response = await loginRequest(login, password);

      const typeToken =
        response.data.token_type[0].toUpperCase() +
        response.data.token_type.slice(1);
      const token = `${typeToken} ${response.data.access_token}`;
      setCookie('accessToken', token);

      dispatch({
        type: AuthActionTypes.AUTH_LOGIN_SUCCESS,
        payload: {
          isAuthenticated: true,
          dataAuth: response.data,
        },
      });
    } catch (error) {
      dispatch({
        type: AuthActionTypes.AUTH_LOGIN_ERROR,
        payload: error,
      });
    }
  };
};

export const getStateAuth = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: AuthActionTypes.AUTH_LOADING });
      await authCheck();
      dispatch({
        type: AuthActionTypes.AUTH_CHECK_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: AuthActionTypes.AUTH_CHECK_ERROR,
      });
    }
  };
};
