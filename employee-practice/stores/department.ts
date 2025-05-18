import { defineStore } from "pinia";
import type { Department } from "@/db";
import { db } from "@/db";

interface DepartmentState {
  departments: Department[];
}

export const useDepartmentStore = defineStore("department", {
  state: (): DepartmentState => ({
    departments: [],
  }),
  getters: {
    getDepartmentById: (state) => (id: number) => {
      return state.departments.find((dept) => dept.id === id);
    },
    getSubDepartments: (state) => (parentId: number) => {
      return state.departments.filter((dept) => dept.parentId === parentId);
    },
  },
  actions: {
    async loadDepartments() {
      this.departments = await db.departments.toArray();
    },
    async addDepartment(department: Department) {
      await db.departments.add(department);
      this.departments.push(department);
    },
    async updateDepartment(id: number, updatedData: Partial<Department>) {
      await db.departments.update(id, updatedData);
      const department = this.getDepartmentById(id);
      if (department) {
        Object.assign(department, updatedData);
      }
    },
    async removeDepartment(id: number) {
      await db.departments.delete(id);
      this.departments = this.departments.filter((dept) => dept.id !== id);
    },
  },
});
