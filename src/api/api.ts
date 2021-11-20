import axios from 'axios';
import { getCookie, tokenEncoder } from '../utils/utils';
import {
  IRequestAuth,
  IResponseCars,
  IResponseCheck,
  IResponseOrders,
  IResponseOrderStatuses,
} from '../types/api';

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

export const logoutRequest = () => {
  const token = getCookie('accessToken');
  if (token) {
    return instanceApiFactory.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  throw new Error('Получен пустой токен');
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

export const getCities = () => {
  return instanceApiFactory.get<IResponseCars>('/db/city');
};

export const getOrderStatuses = () => {
  return instanceApiFactory.get<IResponseOrderStatuses>('/db/orderStatus');
};

export const getOrders = (page: number, limit: number) => {
  const token = getCookie('accessToken');
  if (token) {
    return instanceApiFactory.get<IResponseOrders>(
      `/db/order?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: token },
      }
    );
  }
  throw new Error('Получен пустой токен');
};

export const getOrdersByParams = (
  page: number,
  limit: number,
  cityId?: string,
  statusId?: string
) => {
  const token = getCookie('accessToken');

  const params: string[] = [];

  if (cityId !== undefined) {
    params.push(`cityId=${cityId}`);
  }
  if (statusId !== undefined) {
    params.push(`orderStatusId=${statusId}`);
  }

  if (token) {
    return instanceApiFactory.get<IResponseOrders>(
      `/db/order?page=${page}&limit=${limit}&${params.join('&')}`,
      {
        headers: { Authorization: token },
      }
    );
  }
  throw new Error('Получен пустой токен');
};
