import { IHandleFormData, IQueryFormData } from "@/types/menu";
import http from "@/utils/http";

const list = (data: IQueryFormData): Promise<any> => {
  return http.request({
    url: "/auth/menu/list",
    method: "get",
    params: data,
  });
};

const add = (data: IHandleFormData): Promise<any> => {
  return http.request({
    url: "/auth/menu",
    method: "post",
    data,
  });
};

const edit = (data: IHandleFormData): Promise<any> => {
  return http.request({
    url: "/auth/menu",
    method: "put",
    data,
  });
};

const deletes = (ids: Array<number>): Promise<any> => {
  return http.request({
    url: `/auth/menu/${ids}`,
    method: "delete",
    data: ids,
  });
};

export { list, add, edit, deletes };
