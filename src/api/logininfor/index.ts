import { IHandleFormData, IQueryFormData } from "@/types/logininfor";
import http from "@/utils/http";

const list = (data: IQueryFormData): Promise<any> => {
  return http.request({
    url: "/auth/logininfor/list",
    method: "get",
    params: data,
  });
};

const clean = (data: IHandleFormData): Promise<any> => {
  return http.request({
    url: "/auth/logininfor/clean",
    method: "delete",
    data,
  });
};

const deletes = (ids: Array<number>): Promise<any> => {
  return http.request({
    url: `/auth/logininfor/${ids}`,
    method: "delete",
    data: ids,
  });
};

export { list, clean, deletes };
