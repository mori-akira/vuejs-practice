import type { Table } from "dexie";
import Dexie from "dexie";

export interface Department {
  id?: number;
  name: string;
  parentId?: number;
  responsibleIds: number[];
}

export interface Employee {
  id?: number;
  affiliationDivisionIds: number[];
  sei: string;
  mei: string;
  birthday: string;
  position?: string;
}

class CompanyDB extends Dexie {
  departments!: Table<Department, number>;
  employees!: Table<Employee, number>;

  constructor() {
    super("CompanyDB");
    this.version(1).stores({
      departments: "++id, name, parentId, responsibleId",
      employees: "++id, sei, mei, birthday, position",
    });
  }
}

export const db = new CompanyDB();
