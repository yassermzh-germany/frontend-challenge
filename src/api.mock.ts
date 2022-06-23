/**
 * to mock api.ts
 */

import { mockEmployee } from "./employee.mock";
import { Employee } from "./employee";

const randomTimeout = () => Math.floor(Math.random() * 3000) + 300;

let mockedEmployees = [mockEmployee(), mockEmployee(), mockEmployee()];

// to simulate network
const delayedFn = <T>(fn: () => T) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(fn()), randomTimeout()));

export const getEmployees = (): Promise<Employee[]> =>
  delayedFn(() => mockedEmployees);

export const updateEmployee = (args: {
  id: string;
  changes: Partial<Pick<Employee, "name" | "state">>;
}) =>
  delayedFn(() => {
    const { id, changes } = args;
    const index = mockedEmployees.findIndex((employee) => employee.id === id);
    const updated = { ...mockedEmployees[index], ...changes };
    mockedEmployees = [
      ...mockedEmployees.slice(0, index),
      updated,
      ...mockedEmployees.slice(index + 1),
    ];
    return updated;
  });
