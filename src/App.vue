<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
@use "./styles/breakpoints" as *;

main {
  height: 100%;
  width: 100%;
  max-width: 1600px;
  margin-inline: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @include md {
    padding: 40px;
  }
}
</style>
