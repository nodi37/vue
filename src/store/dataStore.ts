import { defineStore } from "pinia";
import { ref } from "vue";

export const useDataStore = defineStore("data", () => {
  const name = ref("hello");

  return {
    name,
  };
});
