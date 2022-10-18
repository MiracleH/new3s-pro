const state = {
  systemType: <string>"0",
};

const mutations = {
  setSysType(state: any, payload: string) {
    state.systemType = payload;
  },
};

const actions = {};

const getters = {
  getSysType: (state: any) => {
    return state.systemType;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
