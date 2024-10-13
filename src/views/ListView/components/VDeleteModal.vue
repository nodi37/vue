<script setup lang="ts">
import VButton from "@/components/VButton.vue";
import VModal from "@/components/VModal.vue";
import { ref } from "vue";

const modal = ref();
const userName = ref("");

let resolveFn: (value: boolean) => void;

const getUserChoice = (user: string) => {
  modal.value?.open();
  userName.value = user;
  return new Promise<boolean>((resolve) => {
    resolveFn = resolve;
  });
};

const handleChoice = (userAgreed: boolean) => {
  resolveFn(userAgreed);
  modal.value.close();
};

defineExpose({
  getUserChoice,
});
</script>
<template>
  <VModal ref="modal" :close-btn-hidden="true" :overlay-closes-modal="false">
    <div class="content">
      <p class="alert">Are You sure you want to delete {{ userName }}?</p>
      <VButton class="button" @click="() => handleChoice(true)">
        Delete
      </VButton>
      <VButton
        variant="secondary"
        class="button"
        @click="() => handleChoice(false)"
      >
        Cancel
      </VButton>
    </div>
  </VModal>
</template>
<style lang="scss" scoped>
.content {
  padding: 20px;
}

.alert {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

.button {
  width: 100%;
  margin-top: 8px;
  justify-content: center;
}
</style>
