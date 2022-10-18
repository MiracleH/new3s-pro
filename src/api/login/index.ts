import { ILoginInfo } from "@/types/login";
import http from "@/utils/http";

const login = (data: ILoginInfo): Promise<any> => {
  return http.request({
    url: "/login",
    method: "post",
    data,
  });
};

const getInfo = (): Promise<any> => {
  return http.request({
    url: "/getInfo",
    method: "get",
  });
};

export { login, getInfo };
