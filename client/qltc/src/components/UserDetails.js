import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import { MyUserContext } from "../App";
import { authApi, endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
const UserDetails = () => {
  const [user, dispatch] = useContext(MyUserContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);
  const [identityNumber, setIdentityNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const res = await authApi()
          .get(endpoints["current-user"])
          .catch((res) => {
            setError(res.response.data);
          })
          .finally(() => {
            setLoading(false);
          });
        cookie.save("user", res.data);
        setName(res.data.name);
        setAddress(res.data.address);
        setPhone(res.data.phone);
        setEmail(res.data.email);
        setAvatar(res.data.avatar);
        setIdentityNumber(res.data.identityNumber);
      } catch (err) {
        setError("Lỗi khi thêm dữ liệu vào hệ thống.");
      }
    };
    getUser();
  }, [user]);
  if (loading) return <MySpinner />;
  if (user === null) return <MySpinner />;
  const uploadAvatar = async (e) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc muốn đổi ảnh không?")) {
      setLoading(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const SERVER = "http://localhost:8080";
      const action = SERVER + endpoints["user-update"](user.id);
      await fetch(action, {
        method: "POST",
        body: data,
        headers: {
          Authorization: cookie.load("token").access_token,
        },
      })
        .then((res) => {
          if (res.status === 200) alert("Đổi ảnh thành công");
        })
        .catch((res) => setError(res.response.data))
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const updateUser = (evt) => {
    evt.preventDefault();
    if (window.confirm("Bạn có chắc muốn đổi ảnh không?")) {
      setLoading(true);
      const process = async () => {
        try {
          const data = new FormData();
          data.append("name", name);
          data.append("email", email);
          data.append("phone", phone);
          data.append("address", address);
          data.append("identityNumber", identityNumber);
          await authApi()
            .post(endpoints["user-update"](user.id), data)
            .then((res) => {
              if (res.status === 200) {
                alert("Cập nhật thông tin thành công");
                dispatch({
                  type: "logout",
                });
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
          setError("Lỗi hệ thống");
        }
      };
      process();
    }
  };
  const updateUserPassword = (evt) => {
    evt.preventDefault();
    if (window.confirm("Bạn có chắc muốn đổi ảnh không?")) {
      setLoading(true);
      const process = async () => {
        try {
          const data = new FormData();
          data.append("password", password);
          data.append("newPassword", newPassword);
          data.append("confirmPassword", confirmPassword);
          await authApi()
            .post(endpoints["user-update"](user.id), data)
            .then((res) => {
              if (res.status === 200) {
                alert("Đổi mật khẩu thành công");
                dispatch({
                  type: "logout",
                });
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
          setError("Lỗi hệ thống");
        }
      };
      process();
    }
  };
  return (
    <>
      <p className="text-danger">{error}</p>
      <Row>
        <Col md={4} sm={12} xs={12}>
          <div>
            <div className="text-center">
              <Image width={300} height={250} src={avatar} rounded={true} />
            </div>
            <div>
              <form
                id="form-update-avatar"
                onSubmit={(e) => {
                  uploadAvatar(e);
                }}
              >
                <label htmlFor="file" className="form-label">
                  Ảnh đại diện
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  className="form-control"
                  onChange={(e) =>
                    setAvatar(URL.createObjectURL(e.target.files[0]))
                  }
                  required
                />
                <button type="submit" className="btn btn-danger mt-2">
                  Xác nhận
                </button>
              </form>
            </div>
          </div>
        </Col>
        <Col md={8} sm={12} xs={12}>
          <Form onSubmit={updateUser}>
            <Form.Group controlId="form.name">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                value={name}
                placeholder="Nhập tên"
                type="text"
                onChange={(e) => setName(e.target.value)}
                required={true}
                maxLength={30}
              />
            </Form.Group>
            <Form.Group controlId="form.email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                placeholder="Nhập email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
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
            </Form.Group>{" "}
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
            <Form.Group className="mt-2" controlId="form.submit">
              <Button variant="danger" type="submit">
                Sửa thông tin
              </Button>
            </Form.Group>
          </Form>
          <Form onSubmit={updateUserPassword}>
            {!toggle ? (
              <></>
            ) : (
              <>
                <Form.Group>
                  <Form.Label className="h5 text-danger">
                    Đổi mật khẩu
                  </Form.Label>
                  <Form.Group controlId="form.password">
                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                    <Form.Control
                      value={password}
                      placeholder="Nhập mật khẩu hiện tại"
                      type="password"
                      required={true}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="form.newPassword">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                      value={newPassword}
                      placeholder="Nhập mật khẩu mới"
                      type="password"
                      required={true}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="form.confirmPassword">
                    <Form.Label>Xác nhận mật khẩu</Form.Label>
                    <Form.Control
                      value={confirmPassword}
                      placeholder="Nhập lại mật khẩu mới"
                      type="password"
                      required={true}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mt-2" controlId="form.submit">
                    <Button variant="danger" type="submit">
                      Đổi mật khẩu mới
                    </Button>
                  </Form.Group>
                </Form.Group>
              </>
            )}
            <Form.Group className="mt-2" controlId="form.toggle">
              <Button
                variant="primary"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                Đổi mật khẩu
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default UserDetails;
