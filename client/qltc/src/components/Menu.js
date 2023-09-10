import { useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";
import { Button, Card, Col, Row } from "react-bootstrap";
import MySpinner from "../layout/MySpinner";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Menu = () => {
  const [dishes, setDishes] = useState(null);
  useEffect(() => {
    const process = async () => {
      let { data } = await Apis.get(endpoints["dishes"]);
      setDishes(data);
    };
    process();
  }, []);
  if (dishes === null) return <MySpinner />;
  return (
    <>
      <hr />
      <p>
        <span className="h4">WEDDING CALLARY</span> Nhà hàng tiệc cưới mang đến
        thực đơn hoàn hảo nhất cho lễ cưới của bạn Tại thành phố Hồ Chí Minh, có
        rất nhiều nhà hàng tiệc cưới bạn có thể an tâm lựa chọn cho ngày trọng
        đại của mình. Trong đó, Chúng tôi là một trong những địa chỉ uy tín hàng
        đầu. Chúng tôi không chỉ được biết đến là một nhà hàng tổ chức tiệc cưới
        đẹp với những sảnh cưới riêng biệt, nhiều màu sắc khác nhau mà còn được
        biết đến là nhà hàng với thực đơn tiệc cưới ấn tượng và chất lượng. Các
        bếp trưởng tại Chúng tôi luôn chú tâm đến thực đơn, không chỉ sao cho
        chất lượng nhất mà còn phù hợp với từng vùng miền, vừa hài hòa về khẩu
        vị, kích thích cảm xúc, lại vừa phù hợp ngân sách của cô dâu chú rể.
        Không dừng lại ở những món ăn thuần túy của dân tộc, nhà hàng tiệc cưới
        Chúng tôi còn nghiên cứu về ẩm thực Á, Âu để cho ra đời nhiều món ăn
        ngon – lạ – đẹp mắt nhưng vẫn phù hợp với khẩu vị người Việt. Để có được
        những điều đó là nhờ sự thấu hiểu về khẩu vị của thực khách của các đầu
        bếp lành nghề, dày dặn kinh nghiệm tại Chúng tôi.
      </p>
      <h3>Thực đơn</h3>
      <Row>
        {dishes.map((d) => {
          return (
            <Col xs={12} sm={3} className="mt-2 mb-2" key={d.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  width={200}
                  height={200}
                  src={d.image}
                  fluid="true"
                  rounded="true"
                />
                <Card.Body>
                  <Card.Title>{d.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Menu;
