import { listInfo } from ".";

interface IQueryFormData extends listInfo {
  menuName: string;
  visible: string;
}

interface IListData {
  component: string;
  menuName: string;
  menuType: string;
  path: string;
  perms: string;
  visible: string;
  icon:string,
  children: [];
  menuId: number;
  parentId: number;
  status: string;
}

interface IHandleFormData {
  component: string;
  menuName: string;
  menuType: string;
  path: string;
  perms: string;
  visible: string;
  menuId: number;
  parentId: number | undefined;
  sysType: string | undefined;
  status: string;
  orderNum: number;
}

interface IRouterMenu {
  path: string;
  children: Array<IRouterMenu>;
  redirect: string;
  name: string;
  components: () => void;
}

export { IQueryFormData, IListData, IHandleFormData, IRouterMenu };
