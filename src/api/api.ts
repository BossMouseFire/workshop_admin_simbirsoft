import axios, { AxiosResponse } from 'axios';
import { getCookie, tokenEncoder } from '../utils/utils';
import {
  IRequestAuth,
  IRequestCars,
  IRequestCategories,
  IRequestPoints,
  IResponseCities,
  IResponseCheck,
  IResponseOrders,
  IResponseOrderStatuses,
  IResponseCity,
  IResponsePoint,
} from '../types/api';
import { ICar } from '../types/actions/cars';

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

export const getCities = (page?: number, limit?: number) => {
  const params: string[] = [];

  if (page !== undefined) {
    params.push(`page=${page}`);
  }
  if (limit !== undefined) {
    params.push(`limit=${limit}`);
  }
  return instanceApiFactory.get<IResponseCities>(
    `/db/city?${params.join('&')}`
  );
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

export const getCars = async (page: number, limit: number) => {
  return await instanceApiFactory.get<IRequestCars>(
    `/api/db/car?page=${page}&limit=${limit}`
  );
};

export const getCategories = async () => {
  return await instanceApiFactory.get<IRequestCategories>('/db/category');
};

export const getCarsByParams = async (
  page: number,
  limit: number,
  categoryId?: string
) => {
  const params: string[] = [];

  if (categoryId != undefined) {
    params.push(`categoryId=${categoryId}`);
  }

  return await instanceApiFactory.get<IRequestCars>(
    `/db/car?page=${page}&limit=${limit}&${params.join('&')}`
  );
};

export const getPointsToCity = async (id: string) => {
  return await instanceApiFactory.get<IRequestPoints>('/db/point', {
    params: {
      cityId: id,
    },
  });
};

export const getPointsToCities = async (ids: string[]) => {
  const params: string[] = [];
  ids.map((id) => {
    params.push(`cityId=${id}`);
  });
  return await instanceApiFactory.get<IRequestPoints>(
    `/api/db/point?${params.join('&')}`
  );
};

export const postCity = async (
  name: string
): Promise<AxiosResponse<IResponseCity>> => {
  const token = getCookie('accessToken');

  if (token) {
    return await instanceApiFactory.post<IResponseCity>(
      'api/db/city',
      { name },
      {
        headers: { Authorization: token },
      }
    );
  }
  throw new Error('Получен пустой токен');
};

export const deleteCity = async (id: string) => {
  const token = getCookie('accessToken');

  if (token) {
    return await instanceApiFactory.delete(`/db/city/${id}`, {
      headers: { Authorization: token },
    });
  }
  throw new Error('Получен пустой токен');
};

export const postPoint = async (
  name: string,
  address: string,
  cityId: string
): Promise<AxiosResponse<IResponsePoint>> => {
  const token = getCookie('accessToken');

  if (token) {
    return await instanceApiFactory.post<IResponsePoint>(
      'api/db/point',
      { name, cityId, address },
      {
        headers: { Authorization: token },
      }
    );
  }
  throw new Error('Получен пустой токен');
};

export const postCar = async (car: ICar) => {
  const token = getCookie('accessToken');
  if (token) {
    const json = JSON.stringify(car);
    return await instanceApiFactory.post('api/db/city', json, {
      headers: { Authorization: token },
    });
  }
  throw new Error('Получен пустой токен');
};

export const deletePoint = async (id: string) => {
  const token = getCookie('accessToken');

  if (token) {
    return await instanceApiFactory.delete(`/db/point/${id}`, {
      headers: { Authorization: token },
    });
  }
  throw new Error('Получен пустой токен');
};
