import classNames from "classnames";
import { useState } from "react";
import { useMutation } from "./query";
import { updateEmployee } from "./api.mock";
import { Employee, EmployeeState } from "./employee";

const EmployeeStateAsArray = Object.values(EmployeeState);

const formatState = (state: EmployeeState) => {
  return state.toLowerCase();
};

// a state machine to simulate some restrictions
const stateTransition = (current: EmployeeState, next: EmployeeState) => {
  switch (current) {
    case EmployeeState.ADDED: {
      if (next === EmployeeState["IN-CHECK"]) return next;
      break;
    }
    case EmployeeState["IN-CHECK"]: {
      if (next === EmployeeState.APPROVED) return next;
      break;
    }
    case EmployeeState.APPROVED: {
      if (next === EmployeeState.ACTIVE) return next;
      break;
    }
    case EmployeeState.ACTIVE: {
      if (next === EmployeeState.INACTIVE) return next;
      break;
    }
    case EmployeeState.INACTIVE: {
      if (next === EmployeeState.ACTIVE) return next;
      break;
    }
    default: {
      const notHandled: never = current; // never is to make sure we have exhausted all options
      throw new Error(`unknown state: ${notHandled}`);
    }
  }
  return current;
};

export const EmployeeStateSelector = (props: {
  employee: Employee;
  onChange: () => void;
}) => {
  const { mutate, fetching } = useMutation(updateEmployee);
  const [currentState, setCurrentState] = useState(props.employee.state);
  const [nextState, setNextState] = useState(props.employee.state);

  const handleStateChange = (state: EmployeeState) => {
    if (fetching) return;
    if (stateTransition(currentState, state) === currentState) return;

    setNextState(state);
    mutate({ id: props.employee.id, changes: { state } }).then(() => {
      props.onChange();
      setCurrentState(state);
    });
  };

  return (
    <div className="state-list">
      {EmployeeStateAsArray.map((state) => {
        const loading = state === nextState && fetching;

        return (
          <div className="state-item" key={state}>
            <div className="icon center">
              <span className={classNames(loading && "loading")}></span>
            </div>
            <div
              onClick={() => handleStateChange(state)}
              className={classNames(
                "state-item-title",
                state === currentState && "state-item-selected"
              )}
            >
              {formatState(state)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
