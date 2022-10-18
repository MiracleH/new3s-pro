import { listInfo } from ".";

interface IQueryFormData extends listInfo {
  email: string;
  phonenumber: string;
  sex: string;
  userName: string;
  status: string;
}

interface IListData {
  email: string;
  phonenumber: string;
  sex: string;
  userName: string;
  status: string;
  userId: number;
  remark: string;
  nickName: string;
  ownAssocIds: [];
}

interface IHandleFormData {
  email: string;
  phonenumber: string;
  sex: string;
  userName: string;
  status: string;
  userId: number;
  roleIds: number[];
  password: string;
  remark: string;
  nickName: string;
  ownAssocIds: number[];
  roleId: number;
}

export { IQueryFormData, IListData, IHandleFormData };
