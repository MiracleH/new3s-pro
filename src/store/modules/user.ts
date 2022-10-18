import { add, authAssociateAll, deletes, edit, list } from "@/api/user";
import { IHandleFormData, IListData, IQueryFormData } from "@/types/user";

interface IUserStoreState {
  list: Array<IListData>;
  total: number;
}

const state: IUserStoreState = {
  list: [],
  total: 0,
};

const mutations = {
  setListState(state: IUserStoreState, payload: IUserStoreState) {
    state.list = payload.list;
    state.total = payload.total;
  },
};

const actions = {
  list(store: any, payload: IQueryFormData): Promise<any> {
    return list(payload).then(
      ({ code, rows, total }: { code: number; rows: []; total: number }) => {
        if (code === 200) {
          store.commit("setListState", {
            list: rows,
            total,
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
  authAssociateAll(store: any, payload: IQueryFormData): Promise<any> {
    return authAssociateAll(payload).then(
      ({ code, data }: { code: number; data: [] }) => {
        if (code === 200) {
          return data;
        }
      }
    );
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
