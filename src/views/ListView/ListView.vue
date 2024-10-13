<script setup lang="ts">
import VLoadingIndicator from "@/components/VLoadingIndicator.vue";
import Pagination from "@/components/VPagination.vue";
import VTable from "./components/VTable.vue";
import VActionBar from "./components/VActionBar.vue";
import { useRouter } from "vue-router";
import VErrorMessage from "@/components/VErrorMessage.vue";
import { useListViewData } from "./composables/useListViewData";
import VDeleteModal from "./components/VDeleteModal.vue";
import { ref } from "vue";
import { deleteUserById } from "@/api/users";

const router = useRouter();
const tableHeaders = ["", "Full Name", "Action"];
const deleteModal = ref();

const addUserHandler = () => {
  router.push({ name: "add-view" });
};
const editHandler = (id: number) => {
  router.push({ name: "edit-view", params: { id } });
};

const deleteHandler = async (id: number, name: string) => {
  const confirmation = await deleteModal.value.getUserChoice(name);
  if (!confirmation) return;

  await deleteUserById(id);
  // Delete handler,
  // Modal could be modified so it could run the function eg
  // ...getUserChoice(name, deleteFn: async ()=>success:boolean)
  // or create a prop deleteFn: (id: number)=>success:boolean
  // and show message of done / error with ok button
  // Or maybe toast component would be also a good idea
  loadUsersData();
};

const { state, rowsData, pagesCount, currentPage, loadUsersData } =
  useListViewData();
</script>

<template>
  <VDeleteModal ref="deleteModal" />
  <h1 class="heading">User list</h1>
  <div class="table-wrapper">
    <VLoadingIndicator v-if="state == 'loading'" />
    <VErrorMessage v-if="state == 'error'" />
    <template v-if="state == 'ready'">
      <VActionBar @add-user="addUserHandler" />
      <VTable
        :headers="tableHeaders"
        :rows="rowsData"
        @delete-user="(e) => deleteHandler(e.id, e.name)"
        @update-user="editHandler"
      />
    </template>
  </div>
  <Pagination
    class="pagination"
    v-model="currentPage"
    :pages-count="pagesCount"
  />
</template>

<style lang="scss" scoped>
.heading {
  color: var(--color-font);
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;
}

.table-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.pagination {
  margin-top: 16px;
  align-self: flex-start;
}
</style>
