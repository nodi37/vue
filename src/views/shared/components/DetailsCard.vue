<script setup lang="ts">
import VInput from "@/components/VInput.vue";
const firstName = defineModel("firstName");
const lastName = defineModel("lastName");
</script>

<template>
  <div class="card">
    <div class="row">
      <div class="inputWrapper">
        <label class="label" for="firstName">First name</label>
        <VInput
          name="firstName"
          variant="secondary"
          class="input"
          id="firstName"
          v-model="firstName"
        />
      </div>
      <div class="inputWrapper">
        <label class="label" for="lastName">Last name</label>
        <VInput
          name="lastName"
          variant="secondary"
          class="input"
          id="lastName"
          v-model="lastName"
        />
      </div>
    </div>
    <div class="actions">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "@/styles/breakpoints" as *;

.card {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;

  @include lg {
    flex-direction: row;
    padding-top: 50px;
  }
}

.inputWrapper {
  flex: 1;
}

.label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--color-font);
}

.actions {
  margin-top: auto;
}
</style>
