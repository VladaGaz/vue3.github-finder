import { createStore } from "vuex";
import axios from "axios";
import router from "@/router/router";

export default createStore({
  state() {
    return {
      error: null,
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
    getError(state) {
      return state.error;
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
      await axios
        .get(`https://api.github.com/users/${search}`)
        .then((res) => {
          commit("setError", "");
          commit("setUser", res.data);
          commit("setReposURL", res.data.repos_url);

          dispatch("getRepos");
        })
        .catch((err) => {
          commit("setError", "Can`t find this user");
          commit("setUser", null);
          commit("setRepos", []);
        });
    },

    async getRepos({ getters, commit }) {
      // лоадер добавить
      await axios
        .get(`${getters.getReposURL}`)
        .then((res) => {
          commit("setRepos", res.data);
        })
        .catch((err) => {
          commit("setError", "Can`t find this repos");
        });
    },
     clearСontent({ commit }) {
      commit("setUser", null);
      commit("setRepos", []);
      commit("setError", "");
    },
  },
});
