import { useContext, useEffect, useState } from "react";
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
import MySpinner from "../layout/MySpinner";

const Service = () => {
  const [services, setServices] = useState(null);

  useEffect(() => {
    const process = async () => {
      let { data } = await Apis.get(endpoints["services"]);
      setServices(data);
    };
    process();
  }, []);
  if (services === null) return <MySpinner />;
  return (
    <>
      <Row>
        {services.map((s) => {
          return (
            <Col xs={12} sm={4} key={s.id}>
              <Row className="border border-danger rounded m-1 p-1 text-center">
                <p className="fw-bold">{s.name}</p>
              </Row>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default Service;
