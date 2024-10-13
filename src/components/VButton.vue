<script setup lang="ts">
withDefaults(
  defineProps<{ as?: string; variant?: "primary" | "secondary" }>(),
  {
    variant: "primary",
    as: "button",
  }
);
</script>
<template>
  <component :is="as" :class="['button', variant]">
    <slot></slot>
  </component>
</template>
<style lang="scss" scoped>
@use "@/styles/breakpoints" as *;

.button {
  background-color: var(--color-accent);
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.1s;

  @include md {
    padding: 8px 16px;
    font-size: 16px;
  }

  &.secondary {
    border: 1px solid gray;
    background-color: white;
    color: gray;
  }

  &:disabled {
    background-color: gray;
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>
