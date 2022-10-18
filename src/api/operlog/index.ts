import { IHandleFormData, IQueryFormData } from "@/types/operlog";
import http from "@/utils/http";

const list = (data: IQueryFormData): Promise<any> => {
  return http.request({
    url: "/auth/operlog/list",
    method: "get",
    params: data,
  });
};

const clean = (data: IHandleFormData): Promise<any> => {
  return http.request({
    url: "/auth/operlog/clean",
    method: "delete",
    data,
  });
};

const deletes = (ids: Array<number>): Promise<any> => {
  return http.request({
    url: `/auth/operlog/${ids}`,
    method: "delete",
    data: ids,
  });
};

export { list, clean, deletes };
