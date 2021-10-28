import axios from 'axios';
import { getCookie, tokenEncoder } from '../utils/utils';
import { IRequestLogin } from '../types/api';

const instanceApiFactory = axios.create({
  baseURL: 'https://api-factory.simbirsoft1.com/api',
  headers: {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    'Access-Control-Allow-Origin': '*',
  },
});

export const login = (email: string, password: string) => {
  return instanceApiFactory.post<IRequestLogin>(
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
    return instanceApiFactory.get('/auth/check', {
      headers: { Authorization: token },
    });
  }
  return null;
};
