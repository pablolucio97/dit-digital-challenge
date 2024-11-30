import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
});

export interface IApiSuccessResponse<T> {
  RES: T;
  STATUS: number;
}

export interface IApiErrorResponse {
  RES: unknown;
  SUCCESS: string;
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (import.meta.env.DEV) {
    console.log(`[${config.method?.toUpperCase()}] - ${config.url}`);
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse<IApiSuccessResponse<unknown>>) => {
    if (import.meta.env.DEV) {
      console.log("[RESPONSE SUCCESS] - ", response.data);
    }
    return response;
  },
  (error: AxiosError<IApiErrorResponse>) => {
    if (error.response && import.meta.env.DEV) {
      console.log("[RESPONSE ERROR] - ", error.response.data);
      return Promise.reject(error.response.data);
    }
    if (error.request && import.meta.env.DEV) {
      console.log("[RESPONSE ERROR] - ", error.request.data);
      return Promise.reject(error.request.data);
    }
  }
);
