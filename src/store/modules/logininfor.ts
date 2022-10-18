import { clean, deletes, list } from "@/api/logininfor";
import { IHandleFormData, IListData, IQueryFormData } from "@/types/logininfor";

interface ILogininforStoreState {
  list: Array<IListData>;
  total: number;
}

const state: ILogininforStoreState = {
  list: [],
  total: 0,
};

const mutations = {
  setListState(state: ILogininforStoreState, payload: ILogininforStoreState) {
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
  clean(store: any, payload: IHandleFormData): Promise<any> {
    return clean(payload).then((data) => {
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
