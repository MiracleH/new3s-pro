declare global {
  interface Window {
    qiankunStarted: boolean;
  }
}

interface listInfo {
  pageNum: string;
  pageSize: string;
}

interface INormalRes {
  code: number;
  msg: string;
}

interface IResList<T = any> extends INormalRes {
  rows: T[];
  total: number;
  data: T;
}

interface IRes<T = any> extends INormalRes {
  data: T;
}

interface queryInputType {
  type: string;
  key: string;
  name: string;
  selectOption?: any[];
  rules?: { required: boolean; message: string }[];
  slotName?: string;
  defentVal?: any;
  placeholder?: string;
  col?: number;
}

export { listInfo, IResList, IRes, INormalRes, queryInputType };
