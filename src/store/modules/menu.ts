import router from "@/router";
import { add, deletes, edit, list } from "@/api/menu";
import { IHandleFormData, IListData, IQueryFormData } from "@/types/menu";
import { getMenusList, getSonRouter } from "@/utils";
interface IMenuStoreState {
  list: Array<IListData>;
  total: number;
  menulist: [];
}
const state: IMenuStoreState = {
  menulist: [],
  list: [],
  total: 0,
};

const mutations = {
  menuinit(state: any, data: []) {
    state.menulist = getMenusList(data);
    getMenusList(data).forEach((res: any) => {
      router.addRoute(res);
    });
    router.addRoute({
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("@/components/404.vue"),
    });
  },
  sonRouterInit(state: any, data: []) {
    getSonRouter(data.filter((item: any) => item.sysType !== "0")).forEach(
      (item: any) => {
        router.addRoute(item);
      }
    );
  },
  setListState(state: IMenuStoreState, payload: IMenuStoreState) {
    state.list = payload.list;
  },
};

const actions = {
  list(store: any, payload: IQueryFormData): Promise<any> {
    return list(payload).then(({ code, data }: { code: number; data: [] }) => {
      if (code === 200) {
        store.commit("setListState", {
          list: data,
        });
      }
    });
  },
  add(store: any, payload: IHandleFormData): Promise<any> {
    return add(payload).then((data) => {
      if (data.code === 200) {
        return data;
      }
    });
  },
  edit(store: any, payload: IHandleFormData): Promise<any> {
    return edit(payload).then((data) => {
      if (data.code === 200) {
        return data;
      }
    });
  },
  deletes(store: any, payload: Array<number>): Promise<any> {
    return deletes(payload).then((data) => {
      if (data.code === 200) {
        return data;
      }
    });
  },
};

const getters = {
  getmenulist: (state: any): Array<any> => {
    return state.menulist;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
