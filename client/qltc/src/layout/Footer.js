import { Col, Container, Image, Row } from "react-bootstrap";
const Footer = () => {
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
        </Row>
      </Container>
    </>
  );
};

export default Footer;
