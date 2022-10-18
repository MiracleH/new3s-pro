import { IHandleFormData, IQueryFormData } from "@/types/user";
import http from "@/utils/http";

const list = (data: IQueryFormData): Promise<any> => {
  return http.request({
    url: "/auth/user/list",
    method: "get",
    params: data,
  });
};

const add = (data: IHandleFormData): Promise<any> => {
  return http.request({
    url: "/auth/user",
    method: "post",
    data,
  });
};

const edit = (data: IHandleFormData): Promise<any> => {
  return http.request({
    url: "/auth/user",
    method: "put",
    data,
  });
};

const deletes = (ids: Array<number>): Promise<any> => {
  return http.request({
    url: `/auth/user/${ids}`,
    method: "delete",
    data: ids,
  });
};

const authAssociateAll = (data: IQueryFormData): Promise<any> => {
  return http.request({
    url: "/api/authAssociateAll",
    method: "get",
    params: data,
  });
};

export { list, add, edit, deletes, authAssociateAll };
