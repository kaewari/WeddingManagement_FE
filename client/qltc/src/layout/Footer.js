import { useContext } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MyUserContext } from "../App";
const Footer = () => {
  const [user, dispatch] = useContext(MyUserContext);

  return (
    <>
      <Container style={{ backgroundColor: "black" }}>
        <hr />
        <Row>
          <Col xs={2}>
            <Image
              style={{ width: "200px" }}
              src={
                "https://res.cloudinary.com/dt8p4xhzz/image/upload/v1694266261/tiec%20cuoi/logo-website_eymhbj.jpg"
              }
              rounded
            />
          </Col>
          <Col xs={10} style={{ color: "white" }}>
            <p>
              Hotline: 0945 11 22 99 | Điện thoại: 028.38 708 777 | Fax: 028.38
              333 308
            </p>
            <p>Email: support@weddingcenter.vn</p>
            <p>Địa chỉ: 43 Bà Chiểu, Phường Hòa Thạnh, Quận 1, HCM</p>
            <p>Địa chỉ: 32 Lý Chính Thắng, Phường Hòa Thạnh, Quận 3, HCM</p>
          </Col>
          <div className="d-flex justify-content-end h4">
            <Link to="/feedback">Gửi phản hồi</Link>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
