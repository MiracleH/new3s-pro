import { listInfo } from ".";

interface IQueryFormData extends listInfo {
  roleName: string;
  status: string | undefined;
}

interface IListData {
  roleId: number;
  roleName: string;
  roleKey: string;
  status: string;
  remark: string;
  admin: boolean;
  menuIds: [];
}

interface IHandleFormData {
  menuIds: [];
  roleKey: string;
  roleName: string;
  roleSort: number;
  status: string;
  roleId: number;
}

export { IQueryFormData, IListData, IHandleFormData };
