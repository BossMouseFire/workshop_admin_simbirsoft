export const tokenEncoder = (): string => {
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

export const setCookie = (name: string, value: string) => {
  const date = new Date();

  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

export const getCookie = (name: string) => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');

  if (parts.length == 2) {
    const partsPop = parts.pop();
    return partsPop?.split(';').shift();
  }
};

export const deleteCookie = (name: string) => {
  const date = new Date();

  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

  document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
};
