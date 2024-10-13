<script setup lang="ts">
defineProps<{ path: string }>();
</script>

<template>
  <svg viewBox="0 0 24 24">
    <path :d="path" />
  </svg>
</template>
