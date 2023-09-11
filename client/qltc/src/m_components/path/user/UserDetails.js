import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
const UserDetails = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [state, setState] = useState(true);
  const [q] = useSearchParams();
  const userId = q.get("id");
  useEffect(() => {
    const process = async () => {
      try {
        const res = await authApi().get(endpoints["user-detail"](userId));
        setUser(res.data);
        if (res.status === 204) {
          setState(!state);
        } else if (res.status === 404) {
          setError("Not found that user");
        }
      } catch (err) {
        setError("Error taking data from the system.");
      }
    };
    process();
  }, []);

  return (
    <>
      <h2>user details id: {userId} </h2>
      <Link to={"/admin/user/edit?id=" + userId} className="btn btn-secondary">
        You need to update?
      </Link>
      <p className="text-red">{error}</p>
      {user != null && (
        <Row className="container">
          <Col xs={12} md={6}>
            <p>
              Name: <span className="fw-bold">{user.name}</span>
            </p>
            <p>
              Email: <span className="fw-bold">{user.email}</span>
            </p>
            <p>
              Phone:
              <span className="fw-bold">{user.phone}</span>
            </p>
            <p>
              Address: <span className="fw-bold">{user.address}</span>
            </p>
          </Col>

          <Col xs={12} md={6}>
            <p>Avatar: </p>
            <Image
              src={user.avatar}
              width={200}
              height={200}
              roundedCircle={true}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default UserDetails;
