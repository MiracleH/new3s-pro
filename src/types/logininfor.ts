import { listInfo } from ".";

interface IQueryFormData extends listInfo {
  ipaddr: string;
  userName: string;
  status: string;
  loginTime: string;
  beginTime: string;
  endTime: string;
}

interface IListData {
  browser: string;
  ipaddr: string;
  loginLocation: string;
  loginTime: string;
  os: string;
  msg: string;
  userName: string;
  infoId: number;
}

interface IHandleFormData {}

export { IQueryFormData, IListData, IHandleFormData };
