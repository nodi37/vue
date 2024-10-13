<script setup lang="ts">
import { mdiMagnify, mdiPlus } from "@mdi/js";
import VInput from "@/components/VInput.vue";
import VIcon from "@/components/VIcon.vue";
import VButton from "@/components/VButton.vue";
import { ref, watch } from "vue";

export type ActionBarEmits = {
  (e: "addUser"): void;
};

const searchInputValue = ref("");
watch(searchInputValue, (nV) => {
  console.log("Debounced value: " + nV);
});

const emit = defineEmits<ActionBarEmits>();
</script>

<template>
  <div class="action-bar">
    <!-- This is not implemented in the API so I just leave it like this -->
    <VInput
      placeholder="Search for users..."
      type="text"
      :icon-path="mdiMagnify"
      v-model="searchInputValue"
      :debounced="true"
    />
    <VButton class="button" @click="() => emit('addUser')">
      <VIcon class="icon" :path="mdiPlus" />
      Add User
    </VButton>
  </div>
</template>
<style lang="scss" scoped>
@use "@/styles/breakpoints" as *;

.action-bar {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgb(238, 238, 238);

  @include md {
    flex-direction: row;
  }
}

.button {
  margin-left: auto;
}

.icon {
  flex-shrink: 0;
  margin-top: 2px;
  height: 20px;
  width: 20px;
  fill: white;
}
</style>
