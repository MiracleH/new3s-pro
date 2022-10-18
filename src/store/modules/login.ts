import { login, getInfo } from "@/api/login";
import router from "@/router";
import { ILoginInfo } from "@/types/login";
import { IHandleFormData } from "@/types/menu";
import { getSonRouter } from "@/utils";
import { removeToken, setToken } from "@/utils/cookie";
import { RouteRecordRaw } from "vue-router";

interface IUserStoreState {
  token: string;
  user: any;
  permissions: [];
  menus: [];
  renderRouters: [];
  sonsRouters: [];
}

const state: IUserStoreState = {
  token: "",
  user: {},
  permissions: [],
  menus: [],
  renderRouters: [],
  sonsRouters: [],
};

const mutations = {
  setTokenState(state: IUserStoreState, payload: string) {
    state.token = payload;
  },
  reset(state: IUserStoreState): void {
    state.token = "";
    removeToken();
  },
  setUserInfoStatus(state: IUserStoreState, payload: any) {
    state.user = payload.user;
    state.permissions = payload.permissions;
    state.menus = payload.menus;
  },
  setRouterInfoStatus(state: IUserStoreState, payload: any) {
    state.renderRouters = payload;
  },
  setSonsRouterInfoStatus(state: IUserStoreState, payload: any) {
    state.sonsRouters = payload;
  },
};

const actions = {
  login(store: any, payload: ILoginInfo): Promise<any> {
    store.commit("reset");
    return login(payload)
      .then(({ code, token }: { code: number; token: string }) => {
        store.commit("setTokenState", token);
        setToken(token);
        return code;
      })
      .then((code: number) => {
        if (code === 200) {
          store.dispatch("getInfo").then((data: any) => {
            const targetPath = data.menus.find(
              (item: IHandleFormData) => item.sysType === "0"
            )?.children[0]?.path;
            router.push(`/system/${targetPath}`);
          });
        }
      });
  },
  logout(store: any): Promise<any> {
    return new Promise(() => {
      store.commit("reset");
      window.location.href = "/login";
      // router.push(`/login`);
    });
  },
  async getInfo(store: any, payload: any): Promise<any> {
    return await getInfo().then((data) => {
      if (data.code === 200) {
        store.commit("setUserInfoStatus", data);
        store.commit(
          "setRouterInfoStatus",
          data.menus.filter((item: any) => item.sysType === "0")
        );
        store.commit(
          "setSonsRouterInfoStatus",
          data.menus.filter((item: any) => item.sysType !== "0")
        );
        return data;
      }
    });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
