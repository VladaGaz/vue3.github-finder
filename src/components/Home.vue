<template>
  <div>
    <section>
      <div class="container">
        <div class="error" v-if="error" style="margin-bottom: 20px">
          <p>{{ error }}</p>
        </div>

        <search
          :value="search"
          placeholder="Type username..."
          @search="search = $event"
        />

        <button
          v-if="!repos"
          @click="getRepos({search});"
        >
          Search!
        </button>
        <button v-else @click="getRepos({search});">
          Search again!
        </button>

        <div class="user-wrapper" v-if="user">
          <img :src="user.avatar_url" />
          <span> {{ this.user.name }} </span>
          <span> {{ this.user.public_repos }} </span>
        </div>

        <!-- <div class="names-wrapper" v-if="repos">
          <span>
            <a @click="sort('name')">Name repository &#8595</a>
          </span>
          <span>
            <a @click="sort('stargazers_count')">Star &#8595</a>
          </span>
        </div> -->

        <div class="repos_wrapper" v-if="repos">
          <div class="repos_item" v-for="repo in reposSort" :key="repo.id">
            <div class="repos_info">
              <a class="link" target="_blank" :href="repo.html_url">{{
                repo.name
              }}</a>
              <span>{{ repo.stargazers_count }} ⭐</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <section>
      <div class="container" v-if="repos">
        <div class="button-list">
          <div class="btn btnPrimary" @click="prevPage">&#8592;</div>
          <div class="btn btnPrimary" @click="nextPage">&#8594;</div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import search from "@/components/Search.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

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
    ...mapState({
      error: (state) => state.error,
      repos: (state) => state.repos,
      user: (state) => state.user,
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
  methods: {
    ...mapMutations({
      setSearch: "setSearch",
    }),
    ...mapActions({
      getRepos: "getRepos",
    }),
    /*sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "abc" ? "desc" : "abc";
      }
      this.currentSort = e;
    },
    prevPage() {
      if (this.page.current > 1) {
        this.page.current -= 1;
      }
    },
    nextPage() {
      if (this.page.current * this.page.length < this.repos.length) {
        this.page.current += 1;
      }
    },*/
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
button {
  margin-top: 20px;
}
.repos_wrapper {
  width: 400px;
  margin: 20px 0;
}

.repos_info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
}

.user-wrapper {
  margin-top: 20px;
  /*span {
    padding: 0 30px;
  }*/
}
.names-wrapper {
  margin-top: 30px;
  /*span {
    padding: 10px 95px;
  }*/
}
img {
  width: 60px;
  border-radius: 50%;
}

.button-list {
  width: 100%;
  text-align: center;
  /*.btn {
    border-radius: 40px;
    margin: 0 10px;
  }*/
}
</style>