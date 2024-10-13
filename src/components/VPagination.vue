<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  pagesCount: number;
}>();

const model = defineModel<number>();
const isFirstPage = computed(() => !model.value || model.value == 1);
const isLastPage = computed(() => model.value == props.pagesCount);
const buttonsCount = computed(() =>
  props.pagesCount < 11 ? props.pagesCount : 11
);

// Helpers
const calculateButtonNumber = (index: number) =>
  model.value! > 6 ? model.value! - 6 + index : index;

// Handlers
const goToPage = (page: number) => {
  model.value = page;
};
const nextPage = () => {
  model.value = model.value! + 1;
};
const prevPage = () => {
  model.value = model.value! - 1;
};
</script>
<template>
  <nav aria-label="pagination">
    <button class="button" :disabled="isFirstPage" @click="prevPage">
      &laquo;
    </button>
    <button
      v-for="i in buttonsCount"
      :class="['button number', { active: calculateButtonNumber(i) === model }]"
      :disabled="calculateButtonNumber(i) > pagesCount"
      @click="() => goToPage(calculateButtonNumber(i))"
    >
      {{ calculateButtonNumber(i) }}
    </button>
    <button class="button" :disabled="isLastPage" @click="nextPage">
      &raquo;
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  border: 1px solid lightgray;
  border-radius: 8px;
  overflow: hidden;
}

.button {
  display: grid;
  place-content: center;
  width: 40px;
  height: 40px;
  border-right: 1px solid lightgray;
  background-color: white;
  color: var(--color-accent);
  font-weight: 600;
  font-size: 14px;

  &.active {
    background-color: var(--color-accent);
    color: white;
  }

  &:last-child {
    border: 0;
  }

  &:disabled {
    color: gray;
    cursor: not-allowed;

    &.number {
      color: transparent;
    }
  }
}
</style>
