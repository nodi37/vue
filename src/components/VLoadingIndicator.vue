<script lang="ts" setup>
import { mdiLoading } from "@mdi/js";
import Icon from "./VIcon.vue";
</script>

<template>
  <div class="loadingIndicator">
    <Icon class="icon" :path="mdiLoading" />
  </div>
</template>

<style lang="scss" scoped>
.loadingIndicator {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
}

.icon {
  height: 64px;
  width: 64px;
  fill: var(--color-accent);
  animation: rotate 1s ease-in-out infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
