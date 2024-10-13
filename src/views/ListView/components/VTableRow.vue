<script setup lang="ts">
import { mdiDelete, mdiFileEdit } from "@mdi/js";
import Icon from "@/components/VIcon.vue";

export type VTableRowProps = {
  id: number;
  name: string;
  avatar: string;
  highlighted?: boolean;
};

export type VTableRowEmits = {
  (e: "deleteUser", args: { id: number; name: string }): void;
  (e: "updateUser", id: number): void;
};

defineProps<VTableRowProps>();
const emit = defineEmits<VTableRowEmits>();
</script>

<template>
  <div :class="['row', { highlighted }]">
    <img class="avatar" :src="avatar" :alt="name" />
    <span>{{ name }}</span>
    <div class="actions">
      <button @click="() => emit('updateUser', id)">
        <Icon class="icon" :path="mdiFileEdit" />
      </button>
      <button @click="() => emit('deleteUser', { id, name })">
        <Icon class="icon" :path="mdiDelete" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  border-radius: 8px;
  padding: 12px;
  display: grid;
  grid-auto-flow: column;
  align-items: center;

  &.highlighted {
    background-color: #f4f6f8;
  }
}

.avatar {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 999px;
  max-width: 48px;
  max-height: 48px;
}

.actions {
  display: flex;

  .icon {
    height: 24px;
    width: 24px;
    fill: var(--color-font);
  }
}
</style>
