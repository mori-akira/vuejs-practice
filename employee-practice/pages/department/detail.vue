<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <h2><Icon name="tabler:database-edit" class="title" />部署詳細</h2>
    <div class="input-area">
      <div class="row">
        <label for="name">ID</label>
        <span>{{ department.id }}</span>
      </div>
      <div class="row">
        <label for="name">部署名</label>
        <input id="name" v-model="department.name" />
      </div>
      <div class="row">
        <label for="parent">親部署</label>
        <input
          id="parent"
          v-model.number="department.parentId"
          class="small"
          type="number"
        />
        <span class="ml-m">{{ parentDepartmentName }}</span>
      </div>
    </div>
    <div class="flex flex-jc-center mt-l">
      <button class="large" @click="onBack">戻る</button>
      <button
        class="large process ml-l"
        :disabled="disabledProcessButton"
        @click="onEdit"
      >
        更新
      </button>
      <button class="large process ml-l" @click="onDelete">削除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRaw, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Department } from "@/db";
import { useDepartmentStore } from "@/stores/department";

const departmentStore = useDepartmentStore();
const route = useRoute();

const id = parseInt(route.query.id) || null;
const department: Department = reactive({
  id: null,
  name: "",
  parentId: null,
  responsibleIds: [],
});
const disabledProcessButton = computed(() => !department.name);
const parentDepartmentName = computed(() =>
  department.parentId
    ? departmentStore.getDepartmentById(department.parentId)?.name ?? ""
    : ""
);

const onBack = () => {
  navigateTo("/department");
};
const onEdit = async () => {
  await departmentStore.updateDepartment(department.id, toRaw(department));
  navigateTo("/department");
};
const onDelete = async () => {
  await departmentStore.removeDepartment(department.id);
  navigateTo("/department");
};

onMounted(async () => {
  await departmentStore.loadDepartments();
  const departmentLoaded = id
    ? departmentStore.getDepartmentById(id)
    : undefined;
  if (departmentLoaded) {
    Object.assign(department, departmentLoaded);
  }
});
</script>
