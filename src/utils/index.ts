import { IListData } from "@/types/menu";
import { RouterView } from "vue-router";

export function isPermissions(list: Array<string>, handle: string) {
  return list.indexOf(handle) !== -1 || list.indexOf("*:*:*") !== -1;
}

export function getMenusList(list: Array<IListData>): Array<{}> {
  const modules = import.meta.glob("../views/**/index.vue");
  const modulesObj: any = {};
  Object.keys(modules).forEach((key) => {
    const nameMatch = key.match(/^\.\.\/views\/(.+)\.vue/);
    if (!nameMatch) return;
    const indexMatch = nameMatch[1].match(/(.*)\/Index$/i);
    let name = indexMatch ? indexMatch[1] : nameMatch[1];
    modulesObj[`${name}`] = modules[key];
  });
  return list.map((item: IListData) => {
    return {
      name: item.menuName,
      path:
        item.children.length > 0 && ["system"].indexOf(item.path) !== -1
          ? `/${item.path}`
          : `${item.path}`,
      children: getMenusList(item.children),
      icon:item.icon,
      component:
        item.children.length > 0 && ["system"].indexOf(item.path) === -1
          ? RouterView
          : item.children.length > 0
          ? () => import("@/components/layout/index.vue")
          : modulesObj[item.path],
      hidden: item.status,
    };
  });
}

export function getSonRouter(list: Array<IListData>): Array<{}> {
  return list.map((item: IListData) => {
    return {
      name: item.menuName,
      path: `/${item.path}/:afterUser(.*)`,
      component: () => import("@/components/layout/index.vue"),
    };
  });
}
