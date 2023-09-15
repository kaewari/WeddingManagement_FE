import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
const User = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getEmployees = async () => {
      let { data } = await authApi()
        .get(endpoints["users"])
        .finally(setLoading(false));
      setUsers(data);
      console.log(data);
    };
    getEmployees();
  }, [users]);

  const deleteUser = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    if (window.confirm("Bạn có chắc muốn xoá không?")) {
      try {
        await authApi()
          .delete(endpoints["user-delete"](id))
          .then((res) => {
            users.pop((user) => user.id === id);
            alert("Xoá thành công");
            if (res.status === 404) {
              setError("Not found that user");
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (err) {
        setError("Error when trying to delete user.");
      }
    }
  };
  if (users === null) return <MySpinner />;
  if (loading) return <MySpinner />;
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
      <table className="table table-hover table-default">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">IdentityNumber</th>
            <th scope="col">Avatar</th>
          </tr>
        </thead>
        <tbody>
          {users != null &&
            users.map((user) => (
              <tr
                key={user.id}
                className={!user.isActive ? "table-active" : ""}
              >
                <th scope="row">{user.id}</th>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.identityNumber}</td>
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
