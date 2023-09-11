import { useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
const UserCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [file, setFile] = useState();
  const [identityNumber, setIdentityNumber] = useState();
  const [password, setPassword] = useState();
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      data.append("name", name);
      data.append("email", email);
      data.append("address", address);
      data.append("phone", phone);
      data.append("identityNumber", identityNumber);
      data.append("password", password);
      const response = await authApi().post(endpoints["user-create"], data);
      if (response.status === 201) {
        alert("Thêm người dùng thành công");
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
      <h3>Create user</h3>
      <h3 className="text-danger">{error}</h3>
      <Row>
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
                src={file}
                rounded="true"
              />
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
              <Form.Label>Mã xác thực</Form.Label>
              <Form.Control
                value={identityNumber}
                placeholder="Nhập mã xác thực"
                type="text"
                maxLength="10"
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
            <input
              type="file"
              id="file"
              name="file"
              class="form-control"
              onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
              required
            />
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
export default UserCreate;
