import { useContext, useState } from "react";
import Apis, { authApi, endpoints } from "../configs/Apis";
import { Button, Col, Container, Form, Image, ListGroup, Row } from "react-bootstrap";
import { MyUserContext } from "../App";

const UserDetails = ()=>{

    const [user,] = useContext(MyUserContext);
    return <>
            <Row>
                <Col md={4} xs={6}>
                    <Image width={200} src={user.avatar} rounded  />
                </Col>
                
                <Col md={4} xs={6}>
                    <h2 className="text-danger">{user.name}</h2>
                    <p>{user.email}</p>
                    <h3>{user.phone}</h3>
                </Col>
            </Row>
    </>
}
export default UserDetails;