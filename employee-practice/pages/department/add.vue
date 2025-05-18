<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <h2><Icon name="tabler:plus" class="title" />部署追加</h2>
    <div class="input-area">
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
        @click="onAdd"
      >
        追加
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRaw, onMounted } from "vue";
import type { Department } from "@/db";
import { useDepartmentStore } from "@/stores/department";

const departmentStore = useDepartmentStore();
const department: Department = reactive({
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
const onAdd = async () => {
  console.log(toRaw(department));
  await departmentStore.addDepartment(toRaw(department));
  navigateTo("/department");
};

onMounted(async () => {
  await departmentStore.loadDepartments();
});
</script>
