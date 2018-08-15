import axios from 'axios';

type IApiMethod = (
  route: string,
  body?: any,
) => Promise<{ data: any; [k: string]: any }>;

interface IApiMethods {
  get: IApiMethod;
  delete: IApiMethod;
  post: IApiMethod;
  put: IApiMethod;
}

axios.defaults.baseURL = '/api';

const _axios = axios.create({
  headers: { Pragma: 'no-cache' },
});

const axiosWrapper = async (method: string, route: string, body?: any) => {
  try {
    const { data, ...rest } = await _axios[method](route, body);
    if (data.error) {
      throw data.error;
    }
    return { data, ...rest };
  } catch (e) {
    throw e;
  }
};

const api: IApiMethods = {
  get: route => axiosWrapper('get', route),
  delete: route => axiosWrapper('delete', route),
  post: (route, body) => axiosWrapper('post', route, body),
  put: (route, body) => axiosWrapper('put', route, body),
};

export default api;
