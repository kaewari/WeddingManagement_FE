import { useEffect, useState } from "react";
import { AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
import UserCreate from "../user/UserCreate";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getEmployees = async () => {
      let { data } = await authApi()
        .get(endpoints["employees"])
        .catch((res) => {
          setError(res.response.data);
        })
        .finally(setLoading(false));
      setEmployees(data);
      console.log(data);
    };
    getEmployees();
  }, [employees]);

  const deleteEmployee = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    if (window.confirm("Bạn có chắc muốn xoá không?")) {
      try {
        await authApi()
          .delete(endpoints["employee-delete"](id))
          .then((res) => {
            if (res.status === 200) {
              employees.pop((employee) => employee.id === id);
              alert("Xoá thành công");
            }
          })
          .catch((res) => {
            if (res.response.status === 404)
              setError("Not found that employee");
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (err) {
        setError("Error when trying to delete employee.");
      }
    } else {
      return;
    }
  };
  if (employees === null) return <MySpinner />;
  if (loading) return <MySpinner />;
  return (
    <>
      <div className="d-flex justify-content-end me-2">
        <div className="text-primary">
          <Link to="/admin/employee/create">
            <AiFillPlusCircle /> Create a new employee
          </Link>
        </div>
      </div>
      <span className="text-danger">{error}</span>
      <table class="table table-hover table-default">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">IdentityNumber</th>
            <th scope="col">Position</th>
          </tr>
        </thead>
        <tbody>
          {employees != null &&
            employees.map((employee) => (
              <tr className={!employee.isActive ? "table-active" : ""}>
                <th scope="row">{employee.id}</th>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.identityNumber}</td>
                <td>{employee.position}</td>
                <td>
                  <div>
                    <Link
                      className="text-decoration-none"
                      to={"/admin/employee/view?id=" + employee.id}
                    >
                      <GrFormView /> View
                    </Link>
                    <Link
                      className="text-decoration-none"
                      to={"/admin/employee/edit?id=" + employee.id}
                    >
                      <AiFillEdit /> Edit
                    </Link>
                    <Link
                      className="text-decoration-none"
                      to=""
                      onClick={(e) => {
                        deleteEmployee(e, employee.id);
                      }}
                    >
                      <MdDeleteForever />
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Employee;
