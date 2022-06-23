/**
 * to mock employee
 */

import { faker } from "@faker-js/faker";
import { EmployeeState, Employee } from "./employee";

const EmployeeStateAsArray = Object.values(EmployeeState);

export const mockEmployee = (): Employee => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.words(2),
  state: faker.helpers.arrayElement(EmployeeStateAsArray),
});
