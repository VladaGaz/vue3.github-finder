<template>

  <search
    :value="search"
    placeholder="Type username..."
    @search="search = $event"
    @input="handleSearch"
  />

  <div class="flex items-center justify-center min-w-full mb-5" v-if="error">
    <p class=" text-gray-400">{{ error }}</p>
  </div>

  <div
    v-if="user"
    class="
      w-full
      rounded-lg
      sahdow-lg
      flex flex-col
      justify-center
      items-center
      mb-5
    "
  >
    <div class="mb-5">
      <img
        class="object-center object-cover rounded-full h-36 w-36"
        :src="user.avatar_url"
        alt="avatar"
      />
    </div>
    <div class="text-center">
      <a class="hover:text-blue-400" target="_blank" :href="user.html_url">
        {{ this.user.login }}
      </a>
      <p class="text-base text-gray-400 font-normal">
        {{ this.user.public_repos }}
      </p>
    </div>
  </div>

  <div v-if="repos.length !== 0" class="flex items-center justify-center min-w-full mb-5">
        <table class="table text-gray-400 border-solid">
          <thead class=" text-gray-500 ">
            <tr>
              <th class="p-3 text-center">name</th>
              <th class="p-3 text-center">description</th>
              <th class="p-3 text-center">language</th>
              <th class="p-3 text-center">stargazers</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="repo in reposSort" :key="repo.id">
              <td class="p-3 text-center">
                <a class="hover:text-blue-400" target="_blank" :href="repo.html_url">{{
                  repo.name
                }}</a>
              </td>
              <td class="p-3 text-center">
                {{ repo.description }}
              </td>
              <td class="p-3 text-center">
                {{ repo.language }}
              </td>
              <td class="p-3 text-center">{{ repo.stargazers_count }} ⭐</td>
            </tr>
          </tbody>
        </table>
     
  </div>

  <div v-if="repos.length > 0" class="flex items-center justify-center space-x-1 mb-5">
    <a
      @click="prevPage"
      href="#"
      class="
        px-4
        py-2
        text-gray-500
        bg-gray-100
        rounded-md
        hover:bg-blue-400 hover:text-white
      "
    >
      Previous
    </a>
    <a
      @click="nextPage"
      href="#"
      class="
        px-4
        py-2
        text-gray-500
        bg-gray-100
        rounded-md
        hover:bg-blue-400 hover:text-white
      "
    >
      Next
    </a>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import search from "@/components/Search.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    search,
  },
  data() {
    return {
      search: "",
      currentSort: "name",
      currentSortDir: "abc",
      page: {
        current: 1,
        length: 4,
      },
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      repos: "getRepos",
      error: "getError",
    }),
    reposSort() {
      return this.repos
        .sort((a, b) => {
          let mod = 1;
          if (this.currentSortDir === "desc") mod = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;
          return 0;
        })
        .filter((item, index) => {
          let start = (this.page.current - 1) * this.page.length;
          let end = this.page.current * this.page.length;
          if (index >= start && index < end) return true;
        });
    },
  },
  mounted() {
  
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get("q");

    if (value) {
      this.search = value;
      this.getUser({ search: this.search });
    }
  },
  methods: {
    ...mapActions({
      getUser: "getUser",
      clearСontent: "clearСontent",
    }),
    prevPage() {
      if (this.page.current > 1) {
        this.page.current -= 1;
      }
    },
    nextPage() {
      if (this.page.current * this.page.length < this.repos.length) {
        this.page.current += 1;
      }
    },
    handleSearch: throttle(function (e) {
      let value = e.target.value;

      if (value.length === 0) {
        history.replaceState(null, null, window.location.pathname);
        this.clearСontent();
        return;
      }

      this.$router.push({ query: { q: value } });
      this.getUser({ search: value });
  
    }, 1000),
  },
};
</script>
