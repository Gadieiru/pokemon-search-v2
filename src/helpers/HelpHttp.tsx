import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export interface HttpError {
  err: boolean;
  status: number | string;
  statusText: string;
}

interface HelpHttpService {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T | HttpError>;
  post: <T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) => Promise<T | HttpError>;
  put: <T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) => Promise<T | HttpError>;
  del: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ) => Promise<T | HttpError>;
}

//HelpHttp modificado para ser usado con axios
export const HelpHttp = (): HelpHttpService => {

  const customAxios = async <T, D = any>(
    config: AxiosRequestConfig<D> = {},
  ): Promise<T | HttpError> => {

    const timeoutSignal = AbortSignal.timeout(config.timeout || 5000);

    const finalConfig: AxiosRequestConfig<D> = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      ...config,
      signal: config.signal || timeoutSignal,
      withCredentials: true,
    };

    try {
      const res: AxiosResponse<T> = await axios(finalConfig);
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError
        if (axiosError.code === 'ECONNABORTED' || axiosError.name === 'CanceledError'){
          return { err: true, status: "408", statusText: "Tiempo de espera agotado"};
        }

        return {
          err: true,
          status: err.response?.status || "00",
          statusText: err.response?.statusText || err.message || "Axios Error",
        };
      }

      return {
        err: true,
        status: "500",
        statusText: "Unexpected Error",
      };
    }
  };

  const get = <T,>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<T | HttpError> =>
    customAxios<T>({ ...config, url, method: "GET" });

  const post = <T, D>(
    url: string,
    data?: D,
    config: AxiosRequestConfig = {},
  ): Promise<T | HttpError> =>
    customAxios<T, D>({ ...config, url, method: "POST", data });

  const put = <T, D>(
    url: string,
    data?: D,
    config: AxiosRequestConfig = {},
  ): Promise<T | HttpError> =>
    customAxios<T, D>({ ...config, url, method: "PUT", data });

  const del = <T,>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<T | HttpError> =>
    customAxios<T>({ ...config, url, method: "DELETE" });

  return {
    get,
    post,
    put,
    del,
  };
};
