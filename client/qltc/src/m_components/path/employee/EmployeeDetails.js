import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
const EmployeeDetails = () => {
  const [employee, setEmployee] = useState();
  const [error, setError] = useState();
  const [state, setState] = useState(true);
  const [q] = useSearchParams();
  const employeeId = q.get("id");
  useEffect(() => {
    const process = async () => {
      try {
        const res = await authApi().get(
          endpoints["employee-detail"](employeeId)
        );
        setEmployee(res.data);
        if (res.status === 204) {
          setState(!state);
        } else if (res.status === 404) {
          setError("Not found that employee");
        }
      } catch (err) {
        setError("Error taking data from the system.");
      }
    };
    process();
  }, []);
  return (
    <>
      <h2>Employee details id: {employeeId} </h2>
      <Link
        to={"/admin/employee/edit?id=" + employeeId}
        className="btn btn-secondary"
      >
        You need to update?
      </Link>
      <p className="text-red">{error}</p>
      {employee != null && (
        <div className="container">
          <p>
            FirstName: <span className="fw-bold">{employee.firstName}</span>
          </p>
          <p>
            LastName: <span className="fw-bold">{employee.lastName}</span>
          </p>
          <p>
            IdentityNumber:
            <span className="fw-bold">{employee.identityNumber}</span>
          </p>
          <p>
            Position: <span className="fw-bold">{employee.position}</span>
          </p>
          <p>
            BranchId: <span className="fw-bold">{employee.branchId.id}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default EmployeeDetails;
