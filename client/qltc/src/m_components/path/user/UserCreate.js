import { useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
const UserCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [identityNumber, setIdentityNumber] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const createUser = (evt) => {
    evt.preventDefault();
    setLoading(true);
    const process = async () => {
      try {
        await Apis.post(endpoints["user-create"], {
          name: name,
          email: email,
          phone: phone,
          password: password,
          identityNumber: identityNumber,
        })
          .then((res) => {
            if (loading && res.status == null) return <MySpinner />;
            if (res.status === 201) {
              alert("Đăng ký thành công");
              navigate("/login");
            }
          })
          .catch((res) => {
            setError(res.response.data);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (err) {
        setError("Lỗi khi thêm dữ liệu vào hệ thống.");
      }
    };
    process();
  };
  if (loading) return <MySpinner />;
  return (
    <>
      <h3>Create user</h3>
      <h3 className="text-danger">{error}</h3>
      <Row>
        <Col md={12} xs={12}>
          <Form onSubmit={createUser}>
            <Form.Group controlId="form.name">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                value={name}
                placeholder="Nhập tên"
                type="text"
                maxLength={20}
                required={true}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="form.email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                placeholder="Nhập email"
                type="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="form.phone">
              <Form.Label>SĐT</Form.Label>
              <Form.Control
                value={phone}
                placeholder="Nhập số điện thoại"
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                maxLength={10}
                required={true}
              />
            </Form.Group>
            <Form.Group controlId="form.address">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                value={address}
                placeholder="Nhập địa chỉ"
                type="text"
                required={true}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="form.identityNumber">
              <Form.Label>CMND hoặc CCCD</Form.Label>
              <Form.Control
                value={identityNumber}
                placeholder="Nhập mã xác thực"
                type="text"
                maxLength="12"
                onChange={(e) => setIdentityNumber(e.target.value)}
                required={true}
              />
            </Form.Group>
            <Form.Group controlId="form.phone">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                value={password}
                placeholder="Nhập mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required={true}
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="form.submit">
              <Button variant="danger" type="submit">
                Thêm User
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default UserCreate;
