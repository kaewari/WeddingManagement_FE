import { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MyUserContext } from "../App";

const Header = () => {
  const [user, dispatch] = useContext(MyUserContext);
  // const [kw, setKw] = useState("");
  // const nav = useNavigate();

  // const search = (evt) => {
  //   evt.preventDefault();

  //   nav(`/?kw=${kw}`);
  // };

  const logout = () => {
    dispatch({
      type: "logout",
    });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          GOLDEN CENTER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Trang chủ
            </Link>
            <Link className="nav-link" to="/menu">
              Thực đơn
            </Link>
            <Link className="nav-link" to="/service">
              Dịch vụ
            </Link>
            <Link className="nav-link" to="/image">
              Hình ảnh
            </Link>
            <Link className="nav-link" to="/contact">
              Liên hệ
            </Link>
            {user === null ? (
              <Link className="nav-link" to="/login">
                Đăng nhập
              </Link>
            ) : (
              <>
                <Link className="nav-link" to="/details">
                  Chào {user.name}!
                </Link>
                <Button onClick={logout} variant="secondary">
                  Đăng xuất
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {/* <Form onSubmit={search}>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Nhập từ khóa..."
                className=" mr-sm-2"
                value={kw}
                onChange={(e) => setKw(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Tìm</Button>
            </Col>
          </Row>
        </Form> */}
      </Container>
    </Navbar>
  );
};

export default Header;
