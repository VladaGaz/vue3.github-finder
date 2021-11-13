import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      error: null,
      repos: null,
      user: null,
    };
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setRepos(state, repos) {
      state.repos = repos;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getRepos({ commit },{search}) {
      try {
        // добавить лоадер?
        await axios
          .get(`https://api.github.com/users/${search}`)
          .then((res) => {
            commit("setUser", res.data);
            return axios.get(`https://api.github.com/users/${search}/repos`);
          })
          .then((res) => {
            commit("setRepos", res.data);
          });
      } catch (e) {
        commit("setError", "Can`t find this user");
      }
    },
  },
  // вынести модуль и namespaced: true,
  modules: {},
});
