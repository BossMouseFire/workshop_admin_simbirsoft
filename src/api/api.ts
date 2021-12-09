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
  ICarPost,
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
  return postRequest<any, any>('/auth/logout');
};

async function getRequest<T>(url: string): Promise<AxiosResponse<T>> {
  const token = getCookie('accessToken');
  if (token) {
    return await instanceApiFactory.get<T>(url, {
      headers: { Authorization: token },
    });
  }
  throw new Error('Получен пустой токен');
}

async function postRequest<T, V>(url: string, body?: V) {
  const token = getCookie('accessToken');
  if (token) {
    const json = JSON.stringify(body);
    return await instanceApiFactory.post<T>(url, json, {
      headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
  }
  throw new Error('Получен пустой токен');
}

async function deleteRequest(url: string) {
  const token = getCookie('accessToken');

  if (token) {
    return await instanceApiFactory.delete(url, {
      headers: { Authorization: token },
    });
  }
  throw new Error('Получен пустой токен');
}

async function updateRequest<T>(url: string, body: T) {
  const token = getCookie('accessToken');
  if (token) {
    const json = JSON.stringify(body);
    return await instanceApiFactory.put(url, json, {
      headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
  }
  throw new Error('Получен пустой токен');
}

export const authCheck = async () => {
  const url = '/auth/check';
  return await getRequest<IResponseCheck>(url);
};

export const getCities = async (page?: number, limit?: number) => {
  const params: string[] = [];

  if (page !== undefined) {
    params.push(`page=${page}`);
  }
  if (limit !== undefined) {
    params.push(`limit=${limit}`);
  }
  const url = `/db/city?${params.join('&')}`;

  return await getRequest<IResponseCities>(url);
};

export const getOrderStatuses = async () => {
  return await getRequest<IResponseOrderStatuses>('/db/orderStatus');
};

export const getOrders = async (page: number, limit: number) => {
  const url = `/db/order?page=${page}&limit=${limit}`;
  return await getRequest<IResponseOrders>(url);
};

export const getOrdersByParams = async (
  page: number,
  limit: number,
  cityId?: string,
  statusId?: string
) => {
  const params: string[] = [];

  if (cityId !== undefined) {
    params.push(`cityId=${cityId}`);
  }
  if (statusId !== undefined) {
    params.push(`orderStatusId=${statusId}`);
  }

  const url = `/db/order?page=${page}&limit=${limit}&${params.join('&')}`;

  return await getRequest<IResponseOrders>(url);
};

export const getCars = async (page: number, limit: number) => {
  const url = `/api/db/car?page=${page}&limit=${limit}`;
  return await getRequest<IRequestCars>(url);
};

export const getCategories = async () => {
  return await getRequest<IRequestCategories>('/db/category');
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
  return await getRequest<IRequestCars>(
    `/db/car?page=${page}&limit=${limit}&${params.join('&')}`
  );
};

export const getPointsToCity = async (id: string) => {
  const url = `/db/point?cityId=${id}`;
  return await getRequest<IRequestPoints>(url);
};

export const getPointsToCities = async (ids: string[]) => {
  const params: string[] = [];
  ids.map((id) => {
    params.push(`cityId=${id}`);
  });
  return await getRequest<IRequestPoints>(`/api/db/point?${params.join('&')}`);
};

export const postCity = async (
  name: string
): Promise<AxiosResponse<IResponseCity>> => {
  return await postRequest<IResponseCity, {}>('api/db/city', { name });
};

export const deleteCity = async (id: string) => {
  const url = `/db/city/${id}`;

  return await deleteRequest(url);
};

export const postPoint = async (
  name: string,
  address: string,
  cityId: string
): Promise<AxiosResponse<IResponsePoint>> => {
  return await postRequest<IResponsePoint, {}>('api/db/point', {
    name,
    cityId,
    address,
  });
};

export const deletePoint = async (id: string) => {
  const url = `/db/point/${id}`;

  return await deleteRequest(url);
};

export const postCar = async (car: ICarPost) => {
  return await postRequest<never, ICarPost>('/db/car', car);
};

export const updateCar = async (car: ICarPost, id: string) => {
  const url = `/db/car/${id}`;
  return await updateRequest<ICarPost>(url, car);
};
