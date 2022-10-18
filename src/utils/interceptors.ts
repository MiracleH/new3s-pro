// 首先引入axios和上一步封装的cookie方法
import axios, { AxiosInstance } from "axios";
import {
  setToken,
  setRefreshToken,
  getToken,
  getTokenKey,
  getRefreshToken,
  getRefreshTokenKey,
  removeToken,
} from "@/utils/cookie";
import { requesturl, timeout, errorCode } from "@/utils/config";
import { message } from "ant-design-vue";
import router from "@/router";

export class Interceptors {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: requesturl,
      timeout: timeout,
    });
    this.init();
  }
  // 初始化拦截器
  init() {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 判断一下是否有cookie 如果有的话则把cookie放入请求头中
        if (getToken()) {
          config.headers = {
            ...config.headers,
            [getTokenKey()]: `Bearer ${getToken()}`,
            [getRefreshTokenKey()]: getRefreshToken(),
          };
        }
        return config;
      },
      (err) => {
        console.error(err);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const res = response.data;
        if (!response.status.toString().startsWith("2") || res.code === -1) {
          // 如果状态码不是2开头或者接口code返回-1 则是返回错误信息
          console.error("系统错误，请检查API是否正常！");
          return;
        }
        if (res.code !== 200) {
          if (res.code === 401) {
            console.error("登录过期");
            removeToken();

            // router.push("/login");
            window.location.href = "/login";
          } else {
            if (res.msg) {
              message.error(res.msg);
            }
          }
          return Promise.resolve(res);
        } else {
          // 返回成功则把token存储一下
          const headers = response.headers;
          const token = headers.token;
          const refresh_token = headers["refresh-token"];
          if (token && refresh_token) {
            setToken(token);
            setRefreshToken(refresh_token);
          }
          return response;
        }
      },
      (error) => {
        let code: number = error.response.status;
        if (code === 401 || code === -3) {
          removeToken();
          router.push("/login");
        }
        message.error(errorCode[error.response.status]);
        return Promise.resolve(error);
      }
    );
  }
  // 返回一下
  getInterceptors() {
    return this.instance;
  }
}
