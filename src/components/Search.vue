<template>

  <div class="flex justify-center items-center mb-5">
    <div class="mt-5 mb-2 border-2 py-1 px-3 flex justify-between rounde-md rounded-md">
      <input 
      class="flex-grow outline-none text-black focus:placeholder-indigo-400"
      type="text"
      :placeholder="placeholder"
      v-model="search" />
      <spa>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 hover:text-blue-400 transition duration-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </spa>
    </div>
</div>

  <!-- <div class="wrapper__search">
    <div class="search">
      <div class="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-search"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>

    <input
      type="text"
      :placeholder="placeholder"
      v-model="search"
    />
  </div>  -->
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Search",
    },
  },
  data() {
    return {
      search: this.value,
    };
  },
  watch: {
    value(val) {
      this.search = val;
    },
    search(val) {
      this.$emit("search", val);
    },
  },
};
</script>

<style scoped>
/*svg {
  color: #e4e4e4;
}

.wrapper__search {
  position: relative;
  margin: 0px auto;
}
.search {
  top: 0px;
  bottom: 0px;
  left: 0px;
  position: absolute;
}
.search-icon {
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  display: flex;
}
input {
  padding: 16px 16px 16px 56px !important;
  margin-bottom: 0px;
  border-radius: 30px;
  color: #909399;
  font-size: 16px;
  min-width: 400px;
  height: auto;
}*/
</style>


