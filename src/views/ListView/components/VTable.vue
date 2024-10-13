<script setup lang="ts">
import { VTableRowEmits, VTableRowProps } from "./VTableRow.vue";
import VTableRow from "./VTableRow.vue";

defineProps<{
  rows: Array<VTableRowProps>;
  headers?: Array<string>;
}>();
const emit = defineEmits<VTableRowEmits>();
</script>

<template>
  <div class="table">
    <div v-if="headers" class="headers">
      <span v-for="header in headers">
        {{ header }}
      </span>
    </div>
    <div class="rowsWrapper">
      <VTableRow
        class="row"
        v-for="(row, index) in rows"
        v-bind="row"
        :highlighted="!(index % 2)"
        @deleteUser="(e) => emit('deleteUser', e)"
        @updateUser="(e) => emit('updateUser', e)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/breakpoints" as *;

.table {
  --table-columns: 36px 1fr auto;
  --table-gap: 12px;
  flex: 1;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;

  @include md {
    --table-columns: 128px 1fr 96px;
  }
}

.headers {
  padding: 28px 12px 8px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: var(--table-columns);
  gap: var(--table-gap);
  font-weight: 600;
  color: var(--color-font);
}

.rowsWrapper {
  overflow-y: auto;
}

.row {
  grid-template-columns: var(--table-columns);
  gap: var(--table-gap);
}
</style>
