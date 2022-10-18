import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Interceptors } from "./interceptors";

// 请求配置
export class HttpServer {
  axios: AxiosInstance;
  // 获取axios实例
  constructor() {
    this.axios = new Interceptors().getInterceptors();
  }
  // 简单封装一下方法
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axios(config)
        .then((res: AxiosResponse) => {
          resolve(res.data || res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

const http = new HttpServer();

export default http;
