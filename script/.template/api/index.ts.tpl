import { AxiosPromise } from "axios";
import { INormalRes, IRes, IResList } from "@/types";
import { IHandleFormData, IListData, IQueryFormData } from "@/types/{{moduleName}}";
import http from "@/utils/http";

const list = (data: IQueryFormData): Promise<IResList<IListData>> => {
  return http.request<IResList<IListData>>({
    url: "{{moduleApi}}/{{moduleName}}/list",
    method: "get",
    params: data,
  });
};

const add = (data: IHandleFormData): Promise<INormalRes> => {
  return http.request<INormalRes>({
    url: "{{moduleApi}}/{{moduleName}}",
    method: "post",
    data,
  });
};

const edit = (data: IHandleFormData): Promise<INormalRes> => {
  return http.request<INormalRes>({
    url: "{{moduleApi}}/{{moduleName}}",
    method: "put",
    data,
  });
};

const deletes = (ids: Array<number>): Promise<INormalRes> => {
  return http.request<INormalRes>({
    url: `{{moduleApi}}/{{moduleName}}/${ids}`,
    method: "delete",
    data: ids,
  });
};

export { list, add, edit, deletes };
