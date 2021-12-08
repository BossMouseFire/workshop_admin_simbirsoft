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

export const convertDate = (dateInMs: number): string => {
  const date = new Date(dateInMs);
  const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`;
  const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const minutes =
    date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
};

export const convertUrlImg = (path: string | undefined) => {
  if (typeof path === 'string') {
    if (path.indexOf('file') !== -1) {
      return `https://api-factory.simbirsoft1.com${path}`;
    }
  }
  return path;
};

type Callback = (resp: string | ArrayBuffer) => void;

export const convertImgToBase64 = (blob: Blob, callback: Callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  reader.onload = function () {
    if (reader.result) {
      callback(reader.result);
      console.log(reader);
    }
  };
};
