import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      loadingUser: false,
      loadingRepos: false,
      errorUser: false,
      errorRepos: false,
      repos: [],
      user: null,
      reposURL: "",
    };
  },
  getters: {
    getReposURL(state) {
      return state.reposURL;
    },
    getUser(state) {
      return state.user;
    },
    getRepos(state) {
      return state.repos;
    },
    getErrorUser(state) {
      return state.errorUser;
    },
    getErrorRepos(state) {
      return state.errorRepos;
    },
    getLoadingUser(state) {
      return state.loadingUser;
    },
    getLoadingRepos(state) {
      return state.loadingRepos;
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
    setErrorUser(state, errorUser) {
      state.errorUser = errorUser;
    },
    setErrorRepos(state, errorRepos) {
      state.errorRepos = errorRepos;
    },
    setLoadingUser(state, loadingUser) {
      state.loadingUser = loadingUser;
    },
    setLoadingRepos(state, loadingRepos) {
      state.loadingRepos = loadingRepos;
    },
  },
  actions: {
    async getUser({ commit, dispatch }, { search }) {
      commit("setLoadingUser", true);
      await axios
        .get(`https://api.github.com/users/${search}`)
        .then((res) => {
          commit("setErrorUser", false);
          commit("setErrorRepos", false);

          commit("setUser", res.data);
          commit("setReposURL", res.data.repos_url);

          dispatch("getRepos");
        })
        .catch((err) => {
          commit("setErrorUser", true);
          commit("setUser", null);
          commit("setRepos", []);
        })
        .finally(() => {
          commit("setLoadingUser", false);
        });
    },

    async getRepos({ getters, commit }) {
      
      commit("setLoadingRepos", true);
      await axios
        .get(`${getters.getReposURL}`)
        .then((res) => {
          commit("setRepos", res.data);
        })
        .catch((err) => {
          commit("setErrorRepos", true);
        })
        .finally(() => {
          commit("setLoadingRepos", false);
        });
    },
    clearСontent({ commit }) {
      commit("setUser", null);
      commit("setRepos", []);
      commit("setErrorUser", false);
      commit("setErrorRepos", false);
    },
  },
});
