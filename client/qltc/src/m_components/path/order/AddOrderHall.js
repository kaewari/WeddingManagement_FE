import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import Apis, { endpoints } from "../../../configs/Apis";
import Select from "react-select";
const AddOrderhall = (props) => {
  const [hall, setHall] = useState([]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState([]);
  const [hallPrice, setHallPrice] = useState([]);
  useEffect(() => {
    let api = async (pageSize, pageIndex) => {
      let { data } = await Apis.get(
        endpoints["halls"] + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize
      );
      setHall(data);
      setOptions(data.map((d) => ({ value: d.id, label: d.name })));
    };
    api(100, 1);
  }, []);
  const getHallPrice = async (id) => {
    let { data } = await Apis.get(endpoints["hall-price"](id));
    setHallPrice(
      data.map((d) => ({ value: d.id, label: d.period, price: d.price }))
    );
    console.log(hallPrice);
  };
  const handleSelectChangeHall = (e) => {
    getHallPrice(e.value);
  };
  const handleSelectChangeHallPrice = (e) => {
    setPrice(e.price);
  };
  const removeAnotherhall = (e) => {
    document.getElementById(props.id).remove();
  };
  return (
    <Col id={props.id} xs={12} md={12} className="d-flex justify-content-start">
      <Form.Group>
        <Form.Label htmlFor="hall">Search hall</Form.Label>
        <Form.Group style={{ width: "250px" }}>
          <Select options={options} onChange={handleSelectChangeHall} />
        </Form.Group>
      </Form.Group>
      <Form.Group className="ms-2">
        <Form.Label htmlFor="dish">Search hall price</Form.Label>
        <Form.Group style={{ width: "250px" }}>
          <Select options={hallPrice} onChange={handleSelectChangeHallPrice} />
        </Form.Group>
      </Form.Group>
      <Form.Group className="ms-2">
        <Form.Label htmlFor="price">Price</Form.Label>
        <Form.Control
          name="price"
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Nhập giá"
        />
      </Form.Group>
      <Form.Group className="ms-2">
        <Form.Label htmlFor="quantity">Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Nhập số lượng"
        />
      </Form.Group>

      <Form.Group className="ms-2">
        <Form.Label>Remove</Form.Label>
        <Button
          onClick={removeAnotherhall}
          className="form-control"
          id={props.id}
          variant="danger"
        >
          Remove
        </Button>
      </Form.Group>
    </Col>
  );
};
export default AddOrderhall;
