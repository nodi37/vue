<script setup lang="ts">
import { mdiCamera } from "@mdi/js";
import VButton from "@/components/VButton.vue";
import VIcon from "@/components/VIcon.vue";
import { ref } from "vue";

const emit = defineEmits<{
  (e: "change", event: Event): void;
}>();

withDefaults(defineProps<{ imageSrc?: string }>(), {
  imageSrc: "https://placehold.co/200x200",
});

const newImage = ref();

const handleChange = (e: Event) => {
  emit("change", e);
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    newImage.value = URL.createObjectURL(file);
  }
};
</script>

<template>
  <div class="card">
    <img class="avatarPreview" :src="newImage ?? imageSrc" />
    <VButton class="button" variant="secondary" as="label" for="imageUpload">
      <VIcon class="icon" :path="mdiCamera" />
      Change photo
    </VButton>
    <input
      name="avatar"
      class="input"
      @change="handleChange"
      type="file"
      id="imageUpload"
      accept="image/*"
    />
  </div>
</template>
<style lang="scss" scoped>
.card {
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
}

.avatarPreview {
  height: 120px;
  width: 120px;
  border-radius: 999px;
  object-fit: cover;
  display: block;
  margin-inline: auto;
  margin-bottom: 80px;
}

.input {
  display: none;
}

.icon {
  fill: gray;
  width: 20px;
  height: 20px;
}

.button {
  justify-content: center;
}
</style>
