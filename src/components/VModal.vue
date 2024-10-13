<script setup lang="ts">
import { ref } from "vue";
import VIcon from "./VIcon.vue";
import { mdiClose } from "@mdi/js";
const modalVisible = ref(false);

interface VModalProps {
  overlayClosesModal?: boolean;
  closeBtnHidden?: boolean;
}

const props = withDefaults(defineProps<VModalProps>(), {
  overlayClosesModal: true,
});

const open = () => (modalVisible.value = true);
const close = () => (modalVisible.value = false);
const closeByOverlay = (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (props.overlayClosesModal && target.dataset.elementName === "wrapper") {
    modalVisible.value = false;
  }

  return;
};

defineExpose({
  close,
  open,
});
</script>
<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div v-if="modalVisible" class="overlay">&nbsp;</div>
    </Transition>
    <Transition name="modal">
      <div
        v-if="modalVisible"
        @click="(e: MouseEvent) => closeByOverlay(e)"
        data-element-name="wrapper"
        class="modalWrapper"
      >
        <div class="modal">
          <button class="button" v-if="!closeBtnHidden" @click="close">
            <VIcon class="icon" :path="mdiClose" />
          </button>
          <slot> </slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(236, 236, 236, 0.473);
  z-index: 998;
}

.modalWrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  z-index: 999;
}

.modal {
  margin-bottom: 0;
  margin: auto;
  position: relative;
  display: flex;
  min-width: 120px;
  max-width: 640px;
  max-height: 90%;
  padding-top: 4rem;
  padding-bottom: 1rem;
  background-color: white;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  overflow: hidden;

  @media (min-width: 640px) {
    margin-bottom: auto;
    max-height: 610px;
    padding: 36px 0;
    border-radius: 0.375rem;
  }
}

.button {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px;
  border-radius: 999px;
  cursor: pointer;
  display: flex;

  &:hover {
    background-color: #e5e7eb;
  }

  @media (min-width: 640px) {
    top: 16px;
    right: 16px;
  }
}

.icon {
  height: 20px;
  width: 20px;
  fill: "white";
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.overlay-enter-to {
  opacity: 0.7;
}

.modal-enter-active,
.modal-leave-active {
  transition: transform 0.6s ease;
}

.modal-enter-from,
.modal-leave-to {
  transform: translateY(100%);
}
</style>
