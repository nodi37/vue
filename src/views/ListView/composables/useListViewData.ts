import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getUsers } from "@/api/users";
import { VTableRowProps } from "../components/VTableRow.vue";

const useListViewData = () => {
  const state = ref<"ready" | "loading" | "error">("loading");
  const router = useRouter();
  const route = useRoute();
  const pagesCount = ref(1);
  const currentPage = ref(Number(route.query.page ?? 1));
  const rowsData = ref<Array<VTableRowProps>>([]);

  watch(currentPage, async (nV) => {
    loadUsersData();
    if (nV == Number(route.query.page)) return;
    await router.push({ query: { page: nV } });
  });

  watch(
    () => route.query.page,
    async (nV) => {
      const pageNumber = Number(nV);
      currentPage.value = isNaN(pageNumber) ? 1 : pageNumber;
    }
  );

  const loadUsersData = async () => {
    state.value = "loading";
    const response = await getUsers(currentPage.value);
    if (!response.success) {
      state.value = "error";
      return;
    }
    rowsData.value = response.data.map(({ firstName, lastName, ...rest }) => ({
      ...rest,
      name: `${firstName} ${lastName}`,
    }));
    pagesCount.value = response.totalPages;
    state.value = "ready";
  };

  onMounted(() => {
    loadUsersData();
  });

  return {
    state,
    pagesCount,
    currentPage,
    rowsData,
    loadUsersData,
  };
};

export { useListViewData };
