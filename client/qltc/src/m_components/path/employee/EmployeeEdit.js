import { useEffect, useReducer, useState } from "react";
import { authApi, endpoints } from "../../../configs/Apis";
import { useNavigate, useSearchParams } from "react-router-dom";

const EmployeeEdit = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [employee, setEmployee] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [identityNumber, setIdentityNumber] = useState();
  const [position, setPosition] = useState();
  const [branchId, setBranchId] = useState();
  useEffect(() => {
    const process = async () => {
      try {
        const res = await authApi().get(endpoints["employee-detail"](id));
        setEmployee(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setIdentityNumber(res.data.identityNumber);
        setPosition(res.data.position);
        setBranchId(res.data.branchId.id);
        if (res.status === 200) {
          console.log(res.data);
        } else if (res.status === 404) {
          setError("Not found this dish in the system");
        } else {
          throw new Error();
        }
      } catch (err) {
        setError("Error taking data from the system.");
      }
    };
    process();
  }, [id]);

  const sumbitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi().post(
        endpoints["employee-update"](id),
        {
          firstName: firstName,
          lastName: lastName,
          identityNumber: identityNumber,
          position: position,
          branchId: branchId,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 202) {
        navigate(-1);
      }
    } catch (err) {
      setError(" Error when trying to updating data to the system.");
    }
  };
  return (
    <>
      <h3>Update an employee id: {id}</h3>
      {employee == null && error}
      {employee && (
        <form
          id="form-employee"
          onSubmit={(e) => {
            sumbitForm(e);
          }}
        >
          <label htmlFor="firstName" className="form-label">
            FirstName
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            defaultValue={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <label htmlFor="lastName" className="form-label">
            LastName
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            defaultValue={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <label htmlFor="identityNumber" className="form-label">
            IdentityNumber
          </label>
          <input
            type="text"
            id="identityNumber"
            name="identityNumber"
            className="form-control"
            defaultValue={identityNumber}
            onChange={(e) => {
              setIdentityNumber(e.target.value);
            }}
          />
          <label htmlFor="position" className="form-label">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            className="form-control"
            defaultValue={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          />
          <label htmlFor="branchId" className="form-label">
            BranchId
          </label>
          <input
            type="text"
            id="branchId"
            name="branchId"
            className="form-control"
            defaultValue={branchId}
            onChange={(e) => {
              setBranchId(e.target.value);
            }}
          />
          <br></br>
          <button className="btn btn-primary">Update</button>
          {error}
        </form>
      )}
    </>
  );
};
export default EmployeeEdit;
