import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [branchId, setBranchId] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const updateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi()
        .post(endpoints["employee-create"], {
          name: name,
          email: email,
          phone: phone,
          password: password,
          firstName: firstName,
          lastName: lastName,
          position: position,
          branchId: branchId,
          identityNumber: identityNumber,
        })
        .then((res) => {
          if (res.status === 201) {
            alert("Thêm nhân viên thành công.");
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
  if (loading) return <MySpinner />;
  return (
    <>
      <h3>Create employee</h3>
      <h3 className="text-danger">{error}</h3>
      <Row>
        <Col md={12} xs={12}>
          <Form onSubmit={updateUser}>
            <Form.Group controlId="form.name">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={name}
                placeholder="Nhập username"
                type="text"
                maxLength={20}
                required={true}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="form.firstName">
              <Form.Label>Họ</Form.Label>
              <Form.Control
                value={firstName}
                placeholder="Nhập họ"
                type="text"
                maxLength={20}
                required={true}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="form.lastName">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                value={lastName}
                placeholder="Nhập tên"
                type="lastName"
                required={true}
                onChange={(e) => setLastName(e.target.value)}
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

            <Form.Group controlId="form.position">
              <Form.Label>Chức vụ</Form.Label>
              <Form.Control
                value={position}
                placeholder="Nhập chức vụ"
                type="text"
                required={true}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="form.branchId">
              <Form.Label>Mã chi nhánh</Form.Label>
              <Form.Control
                value={branchId}
                placeholder="Nhập mã chi nhánh"
                onChange={(e) => setBranchId(e.target.value)}
                type="text"
                required={true}
              />
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
export default EmployeeCreate;
