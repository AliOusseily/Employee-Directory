import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

const handleRequest = (request: any) => {
  request.headers["Content-Type"] = "application/json";
  return request;
};

const handleError = (error: any) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  if (401 === error.response?.status) {
    console.info("Session has expired!", error);
    window.location.replace("/Error/sessionExpired");
  }
  return Promise.reject(error);
};

abstract class ApiBase {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  };

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };
  private _handleResponse = ({ data }: AxiosResponse) => {
    return data;
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    return handleRequest(config);
  };

  protected _handleError = (error: any) => {
    return handleError(error);
  };
}

export { ApiBase };
