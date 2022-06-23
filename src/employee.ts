/**
 * employee type
 */

export enum EmployeeState {
  ADDED = "ADDED",
  "IN-CHECK" = "IN-CHECK",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type Employee = {
  id: string;
  name: string;
  state: EmployeeState;
};
