import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      loadingUser: false,
      loadingRepositories: false,
      errorUser: false,
      errorRepositories: false,
      repositories: [],
      user: null,
      repositoriesURL: "",
    };
  },
  getters: {
    getRepositoriesURL(state) {
      return state.repositoriesURL;
    },
    getUser(state) {
      return state.user;
    },
    getRepositories(state) {
      return state.repositories;
    },
    getErrorUser(state) {
      return state.errorUser;
    },
    getErrorRepositories(state) {
      return state.errorRepositories;
    },
    getLoadingUser(state) {
      return state.loadingUser;
    },
    getLoadingRepositories(state) {
      return state.loadingRepositories;
    },
  },
  mutations: {
    setRepositoriesURL(state, repositoriesURL) {
      state.repositoriesURL = repositoriesURL;
    },
    setUser(state, user) {
      state.user = user;
    },
    setRepositories(state, repositories) {
      state.repositories = repositories;
    },
    setErrorUser(state, errorUser) {
      state.errorUser = errorUser;
    },
    setErrorRepositories(state, errorRepositories) {
      state.errorRepositories = errorRepositories;
    },
    setLoadingUser(state, loadingUser) {
      state.loadingUser = loadingUser;
    },
    setLoadingRepositories(state, loadingRepositories) {
      state.loadingRepositories = loadingRepositories;
    },
  },
  actions: {
    async getUser({ commit, dispatch }, { search }) {
      commit("setLoadingUser", true);
      await axios
        .get(`https://api.github.com/users/${search}`)
        .then((res) => {
          commit("setErrorUser", false);
          commit("setErrorRepositories", false);

          commit("setUser", res.data);
          commit("setRepositoriesURL", res.data.repos_url);

          dispatch("getRepositories");
        })
        .catch((err) => {
          commit("setErrorUser", true);
          commit("setUser", null);
          commit("setRepositories", []);
        })
        .finally(() => {
          commit("setLoadingUser", false);
        });
    },

    async getRepositories({ getters, commit }) {
      
      commit("setLoadingRepositories", true);
      await axios
        .get(`${getters.getRepositoriesURL}`)
        .then((res) => {
          commit("setRepositories", res.data);
        })
        .catch((err) => {
          commit("setErrorRepositories", true);
        })
        .finally(() => {
          commit("setLoadingRepositories", false);
        });
    },
    clearСontent({ commit }) {
      commit("setUser", null);
      commit("setRepositories", []);
      commit("setErrorUser", false);
      commit("setErrorRepositories", false);
    },
  },
});
