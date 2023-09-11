import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [position, setPosition] = useState();
  const [branchId, setBranchId] = useState();
  const [userId, setUserId] = useState();
  const [identityNumber, setIdentityNumber] = useState();
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi().post(
        endpoints["employee-create"],
        {
          firstName: firstName,
          lastName: lastName,
          position: position,
          branchId: branchId,
          userId: userId,
          identityNumber: identityNumber,
        },
        { headers: { "Content-Type": "Application/json" } }
      );
      if (response.status === 201) {
        alert("Thêm nhân viên thành công");
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
      <h3>Create employee</h3>
      <h3 className="text-danger">{error}</h3>
      <Row>
        <Col md={12} xs={12}>
          <Form onSubmit={updateUser}>
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
            <Form.Group controlId="form.userId">
              <Form.Label>Mã người dùng</Form.Label>
              <Form.Control
                value={userId}
                placeholder="Nhập mã người dùng"
                onChange={(e) => setUserId(e.target.value)}
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
