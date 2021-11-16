<template>
  <search
    :value="search"
    placeholder="Type username..."
    @search="search = $event"
    @input="handleSearch"
  />

  <loader v-if="loadingUser || loadingRepositories" />
  <messageError v-else-if="errorUser || errorRepositories" />

  <div v-else>
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

    <div
      v-if="repositories.length !== 0"
      class="flex items-center justify-center min-w-full mb-5"
    >
      <table class="table text-gray-400 border-solid">
        <thead class="text-gray-500">
          <tr>
            <th class="p-3 text-center">name</th>
            <th class="p-3 text-center">description</th>
            <th class="p-3 text-center">language</th>
            <th class="p-3 text-center">stargazers</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center"
            v-for="repository in repositoriesSort"
            :key="repository.id"
          >
            <td class="p-3 text-center">
              <a
                class="hover:text-blue-400"
                target="_blank"
                :href="repository.html_url"
                >{{ repository.name }}</a
              >
            </td>
            <td class="p-3 text-center">
              {{ repository.description }}
            </td>
            <td class="p-3 text-center">
              {{ repository.language }}
            </td>
            <td class="p-3 text-center">
              {{ repository.stargazers_count }} ⭐
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="repositories.length > 0"
      class="flex items-center justify-center space-x-1 mb-5"
    >
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
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import search from "@/components/Search.vue";
import loader from "@/components/Loader.vue";
import messageError from "@/components/MessageError.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    search,
    loader,
    messageError,
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
      repositories: "getRepositories",
      errorUser: "getErrorUser",
      errorRepositories: "getErrorRepositories",
      loadingUser: "getLoadingUser",
      loadingRepositories: "getLoadingRepositories",
    }),
    repositoriesSort() {
      return this.repositories
        .sort((a, b) => {
          let mod = 1;
          if (this.currentSortDir === "desc") mod = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;
          return 0;
        })
        .filter((item, index) => {
          const start = (this.page.current - 1) * this.page.length;
          const end = this.page.current * this.page.length;
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
      if (this.page.current * this.page.length < this.repositories.length) {
        this.page.current += 1;
      }
    },
    handleSearch: throttle(function (e) {
      const value = e.target.value;

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
