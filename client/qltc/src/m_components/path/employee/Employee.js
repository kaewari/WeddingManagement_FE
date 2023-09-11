import { useEffect, useState } from "react";
import { AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState();
  const [state, setState] = useState(true);
  
  useEffect(() => {
    const getEmployees = async () => {
      let { data } = await authApi().get(endpoints["employees"]);
      setEmployees(data);
      setCount(data.length);
      console.log(data);
    };
    getEmployees();
  }, [state, count]);
  
  const deleteEmployee = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc muốn xoá không?"))
    {
      try
      {
        const request = await authApi().delete(endpoints["employee-delete"](id));
        if (count > 0)
          setCount(count - 1);
        alert("Xoá thành công")
        if (request.status === 204)
        {
          setState(!state);
        } else if (request.status === 404)
        {
          setError("Not found that employee");
        }
      } catch (err)
      {
        setError("Error when trying to delete employee.");
      }
    } else
    {
      return;
    }
  };
  if (employees === null) return <MySpinner />;
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
