import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
import EditBranch from "../branch/EditBranch";

const EmployeeEdit = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [employee, setEmployee] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [position, setPosition] = useState("");
  const [branch, setBranch] = useState({});
  const [loading, setLoading] = useState(false);
  // const [groups, setGroups] = useState([]);
  useEffect(() => {
    setLoading(true);
    const getEmployeeDetails = async () => {
      try {
        const res = await authApi()
          .get(endpoints["employee-detail"](id))
          .catch((res) => {
            if (res.response.status === 404) {
              setError("Not found this employee in the system");
            }
          })
          .finally(() => {
            setLoading(false);
          });
        setEmployee(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setIdentityNumber(res.data.identityNumber);
        setPosition(res.data.position);
        setBranch(res.data.branchId);
      } catch (err) {
        setError("Error taking data from the system.");
      }
    };

    getEmployeeDetails();
  }, [id]);
  // useEffect(() => {
  //   setLoading(true);
  //   const getUserGroups = async () => {
  //     try {
  //       const res = await authApi()
  //         .get(endpoints["groups"])
  //         .catch((res) => {
  //           if (res.response.status === 404) {
  //             setError("Not found groups in the system");
  //           }
  //         })
  //         .finally(() => {
  //           setLoading(false);
  //         });
  //       setGroups(res.data.name);
  //     } catch (err) {
  //       setError("Error taking data from the system.");
  //     }
  //   };
  //   getUserGroups();
  // }, []);
  const updateEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi()
        .post(
          endpoints["employee-update"](id),
          {
            firstName: firstName,
            lastName: lastName,
            identityNumber: identityNumber,
            position: position,
          }
        )
        .catch((res) => {
          setError(res.response.data.Msg);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      setError(" Error when trying to updating data to the system.");
    }
  };
  if (loading) return <MySpinner />;
  return (
    <>
      <h3>Update an employee id: {id}</h3>
      {employee == null && error}
      {employee && (
        <form
          id="form-employee"
          onSubmit={(e) => {
            updateEmployee(e);
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
            required={true}
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
            required={true}
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
            required={true}
            maxLength={12}
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
            required={true}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          />
          <br></br>
          <button className="btn btn-primary">Update</button>
          <EditBranch id={branch.id} />
          {/* <label htmlFor="groups" className="form-label">
            Group
          </label>
          <select>
            {groups.map((group) => (
              <option>{group.name}</option>
            ))}
          </select> */}
          <br></br>
          <button className="btn btn-primary">Update</button>
          {error}
        </form>
      )}
    </>
  );
};
export default EmployeeEdit;
