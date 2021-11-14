import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      error: null,
      repos: null,
      user: null,
      reposURL: "",
    };
  },
  getters: {
    getReposURL(state) {
      return state.reposURL;
    },
  },
  mutations: {
    setReposURL(state, reposURL) {
      state.reposURL = reposURL;
    },
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
    async getUser({ commit, dispatch }, { search }) {
      // добавить лоадер?
      await axios
        .get(`https://api.github.com/users/${search}`)
        .then((res) => {
          commit("setUser", null);
          commit("setUser", res.data);
          commit("setReposURL", res.data.repos_url);
          dispatch('getRepos')
        })
        .catch((err) => {
          commit("setUser", null);
          commit("setRepos", null);
          commit("setError", "Can`t find this user");
        });
    },

    async getRepos({ getters, commit }) {
      // добавить лоадер?
      await axios
        .get(`${getters.getReposURL}`)
        .then((res) => {
          commit("setRepos", res.data);
          console.log(res.data);
          commit("setError", null);
        })
        .catch((err) => {
          commit("setError", "Can`t find this repos");
        });
    },
  },
  // вынести модуль и namespaced: true,
  modules: {},
});
