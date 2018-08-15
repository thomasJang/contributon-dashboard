import api from './axios';

export type Message = {
  code: string;
  ko: string;
  en: string;
};

type IApiError = {
  type?: string;
  code?: number;
  message?: string;
  requiredKey?: string;
};

type IApiPage = {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
};

interface IApiResponse<Data> {
  status?: number;
  redirect?: string;
  message?: string;
  error?: IApiError;
  page?: IApiPage;
  list?: Data[];
}

const ApiProvider = {
  CommonRequest: {
    async i18nMessages(path: string) {
      const { data } = await api.get(`/v1/${path}/messages`);
      return data as Message[];
    },
    async commonCodes(filter?: string) {
      const { data } = await api.get(`/v1/commonCodes/getAllByMap/${filter}`);
      return data as any;
    },
  },

  AuthRequest: {
    async login(email: string | undefined, userPs: string | undefined) {
      const { data } = await api.post(`/v1/login`, { email, userPs });
      return data as any;
    },
    async me() {
      try {
        const { data } = await api.get(`/v1/account/me`);
        return data as any;
      } catch (e) {
        return null;
      }
    },
  },
};

export default ApiProvider;
