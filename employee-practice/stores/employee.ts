import { defineStore } from "pinia";
import type { Employee } from "~/db";
import { db } from "~/db";

interface EmployeeState {
  employees: Employee[];
}

export const useEmployeeStore = defineStore("employee", {
  state: (): EmployeeState => ({
    employees: [],
  }),
  getters: {
    getEmployeeById: (state) => (id: number) => {
      return state.employees.find((emp) => emp.id === id);
    },
    getEmployeesByDivision: (state) => (divisionId: number) => {
      return state.employees.filter((emp) =>
        emp.affiliationDivisionIds.includes(divisionId)
      );
    },
  },
  actions: {
    async loadEmployees() {
      this.employees = await db.employees.toArray();
    },
    async addEmployee(employee: Employee) {
      await db.employees.add(employee);
      this.employees.push(employee);
    },
    async updateEmployee(id: number, updatedData: Partial<Employee>) {
      await db.employees.update(id, updatedData);
      const employee = this.getEmployeeById(id);
      if (employee) {
        Object.assign(employee, updatedData);
      }
    },
    async removeEmployee(id: number) {
      await db.employees.delete(id);
      this.employees = this.employees.filter((emp) => emp.id !== id);
    },
  },
});
