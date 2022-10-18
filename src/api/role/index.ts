import { IHandleFormData, IQueryFormData } from "@/types/role";
import http from "@/utils/http";

const list = (data: IQueryFormData): Promise<any> => {
  return http.request({
    url: "/auth/role/list",
    method: "get",
    params: data,
  });
};

const add = (data: IHandleFormData): Promise<any> => {
  return http.request({
    url: "/auth/role",
    method: "post",
    data,
  });
};

const edit = (data: IHandleFormData): Promise<any> => {
  return http.request({
    url: "/auth/role",
    method: "put",
    data,
  });
};

const deletes = (ids: Array<number>): Promise<any> => {
  return http.request({
    url: `/auth/role/${ids}`,
    method: "delete",
    data: ids,
  });
};

const detail = (id: number): Promise<any> => {
  return http.request({
    url: `/auth/role/${id}`,
    method: "get",
  });
};

export { list, add, edit, deletes, detail };
