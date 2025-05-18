<template>
  <div>
    <h2><Icon name="tabler:list" class="title" />部署一覧</h2>

    <div class="flex flex-jc-end">
      <NuxtLink to="/department/add"
        ><Icon name="tabler:plus" class="nav" />部署追加</NuxtLink
      >
    </div>
    <table class="width-100 mt-m">
      <thead>
        <tr>
          <th>ID</th>
          <th>部署名</th>
          <th>親部署</th>
          <th>責任者</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in showData" :key="data.id">
          <td class="ta-center">
            <NuxtLink
              :to="{ path: '/department/detail', query: { id: data.id } }"
            >
              {{ data.id }}
            </NuxtLink>
          </td>
          <td>{{ data.name }}</td>
          <td>{{ data.parent }}</td>
          <td>
            <ul v-for="responsible in data.responsibles" :key="responsible">
              <li>{{ responsible }}</li>
            </ul>
          </td>
          <td class="ta-center">
            <Icon
              name="tabler:trash"
              class="button red"
              @click="onDeleteDepartment(data.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!existsDepartment">
      <span>部署が存在しません。</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDepartmentStore } from "@/stores/department";
import { useEmployeeStore } from "@/stores/employee";

const departmentStore = useDepartmentStore();
const employeeStore = useEmployeeStore();
const showData = computed(() => {
  return departmentStore.departments.map((dep) => ({
    id: dep.id,
    name: dep.name,
    parent: dep.parentId
      ? departmentStore.getDepartmentById(dep.parentId)?.name ?? ""
      : "",
    responsibles: dep.responsibleIds
      ? dep.responsibleIds
          .map((id) => employeeStore.getEmployeeById(id))
          .map((emp) => `${emp.sei} ${emp.mei}`)
      : [],
  }));
});
const existsDepartment = computed(() => departmentStore.departments.length > 0);

const onDeleteDepartment = async (id) => {
  await departmentStore.removeDepartment(id);
};

onMounted(async () => {
  await departmentStore.loadDepartments();
  await employeeStore.loadEmployees();
});
</script>

<style scoped></style>
