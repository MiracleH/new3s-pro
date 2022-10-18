import { listInfo } from ".";

interface IQueryFormData extends listInfo {
  operName: string;
  title: string;
  businessType: number;
  status: string;
  operTime: string;
  beginTime: string;
  endTime: string;
}

interface IListData {
  operName: string;
  title: string;
  businessType: number;
  status: string;
  operTime: string;
  operId: number;
  operIp: string;
}

interface IHandleFormData {
  method: string;
  requestMethod: string;
  operUrl: string;
  operParam: string;
  jsonResult: string;
  errorMsg: string;
}

export { IQueryFormData, IListData, IHandleFormData };
