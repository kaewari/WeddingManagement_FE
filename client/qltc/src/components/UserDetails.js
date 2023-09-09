import { useContext, useState } from "react";
import Apis, { authApi, endpoints } from "../configs/Apis";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { MyUserContext } from "../App";

const UserDetails = () => {
  const [user] = useContext(MyUserContext);
  const [password, setPassword] = useState(null);
  if (user === null) return;
  return (
    <>
      <Row>
        <Col md={4} xs={6}>
          <Row>
            <Col>
              <Image width={200} src={user.avatar} rounded="true" />
            </Col>
            <Col>
              <Button style={{ width: "200px" }}>Đổi ảnh đại diện</Button>
            </Col>
          </Row>
        </Col>

        <Col md={8} xs={6}>
          <Form>
            <Form.Group>
              <Form.Label>Tên</Form.Label>
              <Form.Control value={user.name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control value={user.email} />
            </Form.Group>
            <Form.Group>
              <Form.Label>SĐT</Form.Label>
              <Form.Control value={user.phone} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control value={user.address} />
            </Form.Group>
            <Form.Group className="mt-2">
              <Button variant="danger">Sửa thông tin</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default UserDetails;
