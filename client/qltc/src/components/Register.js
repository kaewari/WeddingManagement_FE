import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
const Register = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [identityNumber, setIdentityNumber] = useState("");
  const navigate = useNavigate();
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
      <p className="text-danger">{error}</p>
      <Row>
        <Col md={12} xs={12}>
          <Form onSubmit={createUser}>
            <Form.Group controlId="form.name">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                value={name}
                placeholder="Nhập tên"
                type="text"
                maxLength={30}
                required={true}
                onInput={(e) => setName(e.target.value)}
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
            <Form.Group controlId="form.identityNumber">
              <Form.Label>CMND hoặc CCCD</Form.Label>
              <Form.Control
                value={identityNumber}
                placeholder="Nhập số chứng minh nhân dân"
                onChange={(e) => setIdentityNumber(e.target.value)}
                type="text"
                maxLength={12}
                required={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Group controlId="form.password">
                <Form.Label>Mật khẩu hiện tại</Form.Label>
                <Form.Control
                  value={password}
                  placeholder="Nhập mật khẩu"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
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
export default Register;
