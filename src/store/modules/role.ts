import { add, deletes, detail, edit, list } from "@/api/role";
import { IHandleFormData, IListData, IQueryFormData } from "@/types/role";

interface IRoleStoreState {
  list: Array<IListData>;
  total: number;
  detail: Partial<IHandleFormData>;
}

const state: IRoleStoreState = {
  list: [],
  total: 0,
  detail: {},
};

const mutations = {
  setListState(state: IRoleStoreState, payload: IRoleStoreState) {
    state.list = payload.list;
    state.total = payload.total;
  },
  setDetailState(state: IRoleStoreState, payload: IRoleStoreState) {
    state.detail = payload.detail;
  },
};

const actions = {
  list(store: any, payload: IQueryFormData): Promise<any> {
    return list(payload).then(
      ({ code, rows, total }: { code: number; rows: []; total: number }) => {
        if (code === 200) {
          store.commit("setListState", {
            list:
              Number(payload.pageSize) === Number.MAX_SAFE_INTEGER
                ? rows.filter((item: any) => item.status === "0")
                : rows,
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
  detail(store: any, payload: number): Promise<any> {
    return detail(payload).then(
      ({ code, data }: { code: number; data: IHandleFormData }) => {
        if (code === 200) {
          store.commit("setDetailState", data);
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
