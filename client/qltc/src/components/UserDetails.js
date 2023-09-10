import { useContext, useEffect, useState } from "react";
import { authApi, endpoints } from "../configs/Apis";
import cookie from "react-cookies";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { MyUserContext } from "../App";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

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

  const formData = new FormData();

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
  console.log(avatar);
  const updateUser = (evt) => {
    evt.preventDefault();
    console.log(avatar);
    const process = async () => {
      try {
        formData.append("avatar", avatar.fileAttachment);
        await authApi().post(endpoints["updateUser"](user.id), {
          name: name,
          oldPassword: oldPassword,
          email: email,
          phone: phone,
          address: address,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
          avatar: formData,
        });
      
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
          <Row>
            <Col className="text-center">
              <Image width={300} height={250} src={avatar} rounded="true" />
            </Col>
            <Col>
              <Form
                onSubmit={updateUser}
                method="POST"
                encType="multipart/form-data"
              >
                <Form.Group>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      setAvatar(e.target.files[0]);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Button type="submit" style={{ width: "200px" }}>
                    Đổi ảnh đại diện
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Col>

        <Col md={8} xs={6}>
          <Form onSubmit={updateUser}>
            <Form.Group controlId="form.name">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="form.email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="form.phone">
              <Form.Label>SĐT</Form.Label>
              <Form.Control
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
              />
            </Form.Group>
            <Form.Group controlId="form.address">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                value={address}
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
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="form.newPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  value={newPassword}
                  type="newPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="form.confirmPassword">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  value={confirmPassword}
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
