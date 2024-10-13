<script setup lang="ts">
import { ref } from "vue";
import VButton from "@/components/VButton.vue";
import AvatarCard from "@/views/shared/components/AvatarCard.vue";
import DetailsCard from "@/views/shared/components/DetailsCard.vue";
import { createUser } from "@/api/users";

const actionMessage = ref("");
const actionState = ref<"idle" | "pending">("idle");

// Would be good to add form validation like vuelidate
const handleSubmit = async (e: Event) => {
  actionMessage.value = "Saving data...";
  actionState.value = "pending";
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData);

  // The api seems to be fake simple api so I omit the avatar
  const userData = {
    firstName: formDataObject.firstName as string,
    lastName: formDataObject.lastName as string,
  };

  if (!userData.firstName || !userData.lastName) {
    alert("First and last name is required");
    actionState.value = "idle";
    actionMessage.value = "";
    return;
  }

  const response = await createUser(userData);
  if (response.success) {
    actionMessage.value = "Saved...";
    form.reset();
    setTimeout(() => (actionMessage.value = ""), 3000);
    actionState.value = "idle";
    return;
  }

  actionMessage.value = "Server error, try again later...";
};
</script>

<template>
  <div class="scrollWrapper">
    <h1 class="heading">Add user</h1>
    <form @submit.prevent="handleSubmit">
      <fieldset class="fieldsWrapper" :disabled="actionState == 'pending'">
        <DetailsCard class="detailsCard">
          <div class="actionWrapper">
            <VButton type="submit">Add user</VButton> {{ actionMessage }}
          </div>
        </DetailsCard>
        <AvatarCard />
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
