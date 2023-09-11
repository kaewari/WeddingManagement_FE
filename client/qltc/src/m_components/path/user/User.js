import { useEffect, useState } from "react";
import cookie from "react-cookies";
import { AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { MdDeleteForever, MdOutlineFindInPage } from "react-icons/md";
import { Link } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
import { Image } from "react-bootstrap";
const User = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState();
  const [state, setState] = useState(true);

  useEffect(() => {
    const getEmployees = async () => {
      let { data } = await authApi().get(endpoints["users"]);
      setUsers(data);
      setCount(data.length);
      console.log(data);
    };
    getEmployees();
  }, [state, count]);

  const deleteUser = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc muốn xoá không?")) {
      try {
        const request = await authApi().delete(endpoints["user-delete"](id));
        if (count > 0) setCount(count - 1);
        alert("Xoá thành công");
        if (request.status === 204) {
          setState(!state);
        } else if (request.status === 404) {
          setError("Not found that user");
        }
      } catch (err) {
        setError("Error when trying to delete user.");
      }
    } else {
      return;
    }
  };
  if (users === null) return <MySpinner />;
  return (
    <>
      <div className="d-flex justify-content-end me-2">
        <div className="text-primary">
          <Link to="/admin/user/create">
            <AiFillPlusCircle /> Create a new user
          </Link>
        </div>
      </div>
      <span className="text-danger">{error}</span>
      <table class="table table-hover table-default">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Avatar</th>
          </tr>
        </thead>
        <tbody>
          {users != null &&
            users.map((user) => (
              <tr className={!user.isActive ? "table-active" : ""}>
                <th scope="row">{user.id}</th>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <Image
                    src={user.avatar}
                    alt="avatar"
                    width={50}
                    rounded={true}
                  />
                </td>
                <td>
                  <div>
                    <Link
                      className="text-decoration-none"
                      to={"/admin/user/view?id=" + user.id}
                    >
                      <GrFormView /> View
                    </Link>
                    <Link
                      className="text-decoration-none"
                      to={"/admin/user/edit?id=" + user.id}
                    >
                      <AiFillEdit /> Edit
                    </Link>
                    <Link
                      className="text-decoration-none"
                      to=""
                      onClick={(e) => {
                        deleteUser(e, user.id);
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

export default User;
