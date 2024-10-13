<script setup lang="ts">
import { computed, ref } from "vue";
import VIcon from "./VIcon.vue";

defineOptions({
  inheritAttrs: false,
});

type DebounceProps =
  | { debounced?: false }
  | { debounced: true; timeout?: number };

type VInputProps = {
  variant?: "primary" | "secondary";
  iconPath?: string;
  iconPosition?: "left" | "right";
} & DebounceProps;

const props = withDefaults(defineProps<VInputProps>(), {
  variant: "primary",
  iconPosition: "right",
  timeout: 500,
});

const debounceTimeoutId = ref(0);
const model = defineModel();
const computedModel = computed({
  get: () => model.value,
  set: (value: unknown) => {
    if (!props.debounced) {
      model.value = value;
      return;
    }

    if (debounceTimeoutId.value) {
      clearTimeout(debounceTimeoutId.value);
    }

    debounceTimeoutId.value = setTimeout(() => {
      model.value = value;
    }, props.timeout);
  },
});
</script>
<template>
  <div
    :class="[
      'inputWrapper',
      variant,
      { withIcon: iconPath },
      iconPosition == 'left' ? 'iconLeft' : 'iconRight',
    ]"
  >
    <VIcon v-if="iconPath" :path="iconPath" class="icon" />
    <input v-bind="$attrs" class="input" v-model="computedModel" />
  </div>
</template>
<style lang="scss" scoped>
@use "@/styles/breakpoints" as *;

.inputWrapper {
  position: relative;
  background-color: #f6f7f8;
  border-radius: 8px;

  &.secondary {
    border: 1px solid gainsboro;
    background-color: white;
  }

  &:has(:focus-visible) {
    outline: 2px solid var(--color-accent);
    outline-offset: 1px;
  }

  &:has(:disabled) {
    opacity: 0.6;
  }
}

.icon {
  position: absolute;
  height: 20px;
  width: 20px;
  top: 50%;
  transform: translateY(-50%);

  @at-root .iconLeft & {
    left: 8px;

    @include md {
      left: 12px;
    }
  }

  @at-root .iconRight & {
    right: 8px;

    @include md {
      right: 12px;
    }
  }
}

.input {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
  font-size: 16px;
  padding: 8px;

  @at-root .withIcon.iconLeft & {
    padding-left: 36px;
  }

  @at-root .withIcon.iconRight & {
    padding-right: 36px;
  }

  &:focus-visible {
    outline: none;
  }
}
</style>
