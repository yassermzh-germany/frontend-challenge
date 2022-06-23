import { Employee } from "./employee";

const baseUrl = "http://api.x.com/";

export const getEmployees = (): Promise<Employee[]> => {
  return fetch(`${baseUrl}/employees`).then((res) => res.json());
};

export const updateEmployee = (args: {
  id: string;
  changes: Pick<Employee, "state" | "name">;
}): Promise<Employee> => {
  const { id, changes } = args;
  return fetch(`${baseUrl}/employees/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  }).then((res) => res.json());
};
