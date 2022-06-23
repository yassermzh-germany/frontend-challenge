import { useQuery } from "./query";
import { getEmployees } from "./api.mock";
import { Employee } from "./employee";
import { EmployeeStateSelector } from "./EmployeeStateSelector";
import { Loading } from "./Loading";

export const EmployeeRow = (props: {
  employee: Employee;
  onUpdate: () => void;
}) => {
  return (
    <div className="employee-list-item">
      <div className="name-column">{props.employee.name}</div>

      <EmployeeStateSelector
        employee={props.employee}
        onChange={props.onUpdate}
      />
    </div>
  );
};

export const EmployeesList = () => {
  const query = useQuery(getEmployees);

  if (query.fetching && !query.data) {
    return <Loading />;
  }

  if (!query.data) {
    return <div className="center">Empty list!</div>;
  }

  const handleUpdate = () => {
    query.refetch();
  };

  return (
    <div className="employee-list">
      <h1>Employees</h1>
      {query.data.map((employee) => (
        <EmployeeRow
          key={employee.id}
          employee={employee}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};
