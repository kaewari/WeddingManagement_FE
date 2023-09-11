import { useEffect, useReducer, useState } from "react";
import { authApi, endpoints } from "../../../configs/Apis";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Form, Row, Image } from "react-bootstrap";
import cookie from "react-cookies";
const UserEdit = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    const process = async () => {
      try {
        const res = await authApi().get(endpoints["user-detail"](id));
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setAddress(res.data.address);
        setPhone(res.data.phone);
        setAvatar(res.data.avatar);
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
  const uploadAvatar = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const SERVER = "http://localhost:8080";
    const action = SERVER + endpoints["user-update"](user.id);
    await fetch(action, {
      method: "POST",
      body: data,
      headers: {
        Authorization: cookie.load("token").access_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Đổi ảnh thành công");
      })
      .catch((err) => console.error(err));
  };
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi().post(endpoints["user-update"](id), {
        name: name,
        email: email,
        address: address,
        phone: phone,
      });
      if (response.status === 200) {
        alert("Cập nhật thông tin thành công");
      }
      if (response.status === 202) {
        navigate(-1);
      }
    } catch (err) {
      setError(" Error when trying to updating data to the system.");
    }
  };
  return (
    <>
      <h3>Update an user id: {id}</h3>
      <Row>
        {user == null && error}
        <Col md={4} xs={6}>
          <div>
            <label for="file" class="form-label">
              Ảnh đại diện
            </label>
            <div className="text-center">
              <Image
                className="mb-2"
                width={250}
                height={200}
                src={avatar}
                rounded="true"
              />
            </div>
            <div>
              <form
                id="form-update-avatar"
                onSubmit={(e) => {
                  uploadAvatar(e);
                }}
              >
                <input
                  type="file"
                  id="file"
                  name="file"
                  class="form-control"
                  onChange={(e) =>
                    setAvatar(URL.createObjectURL(e.target.files[0]))
                  }
                  required
                />
                <button type="submit" className="btn btn-danger mt-2">
                  Xác nhận
                </button>
              </form>
            </div>
          </div>
        </Col>
        {user && (
          <Col md={8} xs={6}>
            <Form onSubmit={updateUser}>
              <Form.Group controlId="form.name">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  value={name}
                  placeholder="Nhập tên"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  readOnly={true}
                />
              </Form.Group>

              <Form.Group controlId="form.email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  placeholder="Nhập email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="form.phone">
                <Form.Label>SĐT</Form.Label>
                <Form.Control
                  value={phone}
                  placeholder="Nhập số điện thoại"
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                />
              </Form.Group>
              <Form.Group controlId="form.address">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  value={address}
                  placeholder="Nhập địa chỉ"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mt-2" controlId="form.submit">
                <Button variant="danger" type="submit">
                  Sửa thông tin
                </Button>
              </Form.Group>
            </Form>
          </Col>
        )}
      </Row>
    </>
  );
};
export default UserEdit;
