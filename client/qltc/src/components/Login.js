import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import cookie from "react-cookies";
import { Navigate, useSearchParams } from "react-router-dom";
import { MyUserContext } from "../App";
import Apis, { authApi, endpoints } from "../configs/Apis";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Login = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [q] = useSearchParams();
    
    const login = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                let res = await Apis.post(endpoints['login'], {
                    "name": name,
                    "password": password
                });
                cookie.save("token", res.data);                
                
                let {data} = await authApi().get(endpoints['current-user']);
                data['role'] = res.data.role;
                data['permissions'] = res.data.permissions
                cookie.save("user", data);

                dispatch({
                    "type": "login",
                    "payload": data
                });
            } catch (err) {
                console.error(err);
            }
        }

        process();
    }

    if (user !== null) {
        let next = q.get("next") || "/";
        return <Navigate to={next} />
    }

    return <>
        <h1 className="text-center text-info">ĐĂNG NHẬP NGƯỜI DÙNG</h1>

        <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="form.name">
                <Form.Label>Tên đăng nhập</Form.Label>
                <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Tên đăng nhập" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.password">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Mật khẩu" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.submit">
                <Button variant="info" type="submit">Đăng nhập</Button>
            </Form.Group>
        </Form>
    </>
}

export default Login;