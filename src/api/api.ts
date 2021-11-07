import axios from 'axios';
import { getCookie, tokenEncoder } from '../utils/utils';
import { IRequestAuth, IResponseCheck } from '../types/auth';

const instanceApiFactory = axios.create({
  baseURL: 'https://api-factory.simbirsoft1.com/api',
  headers: {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    'Access-Control-Allow-Origin': '*',
  },
});

export const loginRequest = (email: string, password: string) => {
  return instanceApiFactory.post<IRequestAuth>(
    '/auth/login',
    { username: email, password },
    {
      headers: {
        Authorization: tokenEncoder(),
      },
    }
  );
};

export const authCheck = () => {
  const token = getCookie('accessToken');
  if (token) {
    return instanceApiFactory.get<IResponseCheck>('/auth/check', {
      headers: { Authorization: token },
    });
  }
  throw new Error('Получен пустой токен');
};
