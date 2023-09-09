import { Col, Image, Row} from "react-bootstrap"
const Home = () =>
{
    return <>
        <h1 className="text-center text-danger">TRUNG TÂM TIỆC CƯỚI</h1>
        <Col xs={12}>
            <Image style={{width:"100%"}} src={"https://res.cloudinary.com/dt8p4xhzz/image/upload/v1694261175/tiec%20cuoi/tiec-cuoi-1_klwjom.jpg"} fluid/>
        </Col>
        
    </>
}
export default Home;