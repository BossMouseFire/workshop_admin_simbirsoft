import axios from 'axios';

const instanceApiFactory = axios.create({
  baseURL: 'https://api-factory.simbirsoft1.com',
  headers: {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    'Access-Control-Allow-Origin': '*',
  },
});

export const login = (email: string, password: string) => {
  return instanceApiFactory.post(
    '/auth/login',
    { username: email, password },
    {
      headers: {
        Authorization: tokenEncoder(),
      },
    }
  );
};

const tokenEncoder = (): string => {
  const token = btoa(`${getRandomString()}:4cbcea96de`);
  return `Basic ${token}`;
};

const getRandomString = (): string => {
  let result = '';
  while (!result) {
    result = Math.random().toString(36).substring(7);
  }
  return result;
};
