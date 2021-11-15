<template>
  <div class="flex justify-center items-center mb-5">
    <div
      class="
        mt-5
        mb-2
        border-2
        py-1
        px-3
        flex
        justify-between
        rounde-md
        rounded-md
      "
    >
      <input
        class="flex-grow outline-none text-black focus:placeholder-indigo-400"
        type="text"
        :placeholder="placeholder"
        v-model="search"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="
          h-6
          w-6
          text-gray-400
          hover:text-blue-400
          transition
          duration-100
          cursor-pointer
        "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  </div>
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
