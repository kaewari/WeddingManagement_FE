import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import { MyUserContext } from "../App";
import { authApi, endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
const UserDetails = () => {
  const [user, dispatch] = useContext(MyUserContext);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        let { data } = await authApi().get(endpoints["current-user"]);
        cookie.save("user", data);
        setName(data.name);
        setAddress(data.address);
        setPhone(data.phone);
        setEmail(data.email);
        setAvatar(data.avatar);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [user]);
  if (user === null) return <MySpinner />;
  console.log(avatar);
  const uploadAvatar = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const SERVER = "http://localhost:8080";
    const action = SERVER + endpoints["update-user"](user.id);
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
  const updateUser = (evt) => {
    evt.preventDefault();
    console.log(avatar);
    const process = async () => {
      try {
        await authApi().post(endpoints["user-update"](user.id), {
          name: name,
          oldPassword: oldPassword,
          email: email,
          phone: phone,
          address: address,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        });
        alert("Cập nhật thông tin thành công");
        dispatch({
          type: "logout",
        });
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    };
    process();
  };

  return (
    <>
      <Row>
        <Col md={4} xs={6}>
          <div>
            <div className="text-center">
              <Image width={300} height={250} src={avatar} rounded="true" />
            </div>
            <div>
              <form
                id="form-update-avatar"
                onSubmit={(e) => {
                  uploadAvatar(e);
                }}
              >
                <label for="file" class="form-label">
                  Ảnh đại diện
                </label>
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
                <button type="submit" className="btn btn-danger">
                  Xác nhận
                </button>
              </form>
            </div>
          </div>
        </Col>

        <Col md={8} xs={6}>
          <Form onSubmit={updateUser}>
            <Form.Group controlId="form.name">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                value={name}
                placeholder="Nhập tên"
                type="text"
                onChange={(e) => setName(e.target.value)}
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
            <Form.Group>
              <Form.Label className="h5 text-danger">Đổi mật khẩu</Form.Label>
              <Form.Group controlId="form.oldPassword">
                <Form.Label>Mật khẩu hiện tại</Form.Label>
                <Form.Control
                  value={oldPassword}
                  placeholder="Nhập mật khẩu hiện tại"
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="form.newPassword">
                <Form.Label>Mật khẩu mới</Form.Label>
                <Form.Control
                  value={newPassword}
                  placeholder="Nhập mật khẩu mới"
                  type="newPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="form.confirmPassword">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  value={confirmPassword}
                  placeholder="Nhập lại mật khẩu mới"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="mt-2" controlId="form.submit">
              <Button variant="danger" type="submit">
                Sửa thông tin
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default UserDetails;
