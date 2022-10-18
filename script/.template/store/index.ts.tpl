import { add, deletes, edit, list } from "@/api/{{moduleName}}";
import { IHandleFormData, IListData, IQueryFormData } from "@/types/{{moduleName}}";

interface I{{moduleLargeName}}StoreState {
  list: Array<IListData>;
  total: number;
}

const state: I{{moduleLargeName}}StoreState = {
  list: [],
  total: 0,
};

const mutations = {
  setListState(state: I{{moduleLargeName}}StoreState, payload: I{{moduleLargeName}}StoreState) {
    state.list = payload.list;
    state.total = payload.total;
  },
};

const actions = {
  list(store: any, payload: IQueryFormData): Promise<any> {
    return list(payload).then(
      ({ code, data }: { code: number; data: { total: number ,rows:[]};}) => {
        if (code === 200) {
          store.commit("setListState", {
            list: data.rows,
            total:data.total,
          });
        }
      }
    );
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

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
