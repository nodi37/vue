<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import VButton from "@/components/VButton.vue";
import AvatarCard from "@/views/shared/components/AvatarCard.vue";
import DetailsCard from "@/views/shared/components/DetailsCard.vue";
import { getUserData, updateUserById } from "@/api/users";
import { useRoute, useRouter } from "vue-router";

const actionMessage = ref("");
const actionState = ref<"idle" | "pending">("idle");
const route = useRoute();
const router = useRouter();
const currentUserData = reactive({
  id: 0,
  firstName: "",
  lastName: "",
  avatar: "",
});

// Same with the validation
const handleSubmit = async (e: Event) => {
  actionMessage.value = "Saving data...";
  actionState.value = "pending";
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData);

  const userData = {
    firstName: formDataObject.firstName as string,
    lastName: formDataObject.lastName as string,
  };

  // The updateUserById allows to uses PATCH
  // So it should allow to update document partially
  // Like firstName or lastName only
  // But it would need additional logic
  // To recognize what changed in the document
  // It's simpler to send whole doc at once
  // It's already loaded so UX is fine
  // It's small amount of data so its also fine in this case
  if (!userData.firstName || !userData.lastName) {
    alert("First and last name is required");
    actionState.value = "idle";
    return;
  }

  const response = await updateUserById(currentUserData.id, userData);
  if (response.success) {
    actionMessage.value = "Saved...";
    setTimeout(() => (actionMessage.value = ""), 3000);
    actionState.value = "idle";
    return;
  }

  actionMessage.value = "Server error, try again later...";
};

onMounted(async () => {
  const { id } = route.params;
  const idNum = Number(id);
  if (isNaN(idNum)) {
    router.push({ name: "not-found-view" });
    return;
  }
  const response = await getUserData(idNum);
  if (!response.success) {
    router.push({ name: "not-found-view" });
    return;
  }
  const { email: _, ...data } = response.data;
  Object.assign(currentUserData, data);
});
</script>

<template>
  <div class="scrollWrapper">
    <h1 class="heading">Edit user</h1>
    <form @submit.prevent="handleSubmit">
      <fieldset class="fieldsWrapper" :disabled="actionState == 'pending'">
        <DetailsCard
          class="detailsCard"
          :first-name="currentUserData.firstName"
          :last-name="currentUserData.lastName"
        >
          <div class="actionWrapper">
            <VButton type="submit">Update user</VButton> {{ actionMessage }}
          </div>
        </DetailsCard>
        <AvatarCard :image-src="currentUserData.avatar" />
      </fieldset>
    </form>
  </div>
</template>
<style lang="scss" scoped>
@use "@/styles/breakpoints" as *;

.scrollWrapper {
  flex: 1;
  overflow: auto;
  padding: 10px;
}

.heading {
  font-weight: 500;
  margin-bottom: 12px;
}

.fieldsWrapper {
  display: grid;
  gap: 20px;

  @include md {
    grid-template-columns: 5fr 3fr;
  }
}

.actionWrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detailsCard {
  order: 1;

  @include md {
    order: unset;
  }
}
</style>
