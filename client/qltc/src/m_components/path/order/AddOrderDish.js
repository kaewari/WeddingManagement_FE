import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
const AddOrderDish = (props) => {
  const [dish, setDish] = useState([]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [newDishes, setNewDishes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const addDish = {};
  useEffect(() => {
    let api = async (pageSize, pageIndex) => {
      let { data } = await Apis.get(
        endpoints["dishes"] +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      );
      setOptions(
        data.map((d) => ({ value: d.id, label: d.name, price: d.price }))
      );
    };
    api(100, 1);
  }, []);
  const handleSelectChange = (e) => {
    setDish(e.value);
    setPrice(e.price);
  };
  const onTrigger = async (e) => {
    e.preventDefault();
    //   await Apis.get(endpoints["order-details-dishes"], dishes);
    console.log(JSON.stringify(dishes));
  };
  const addToGroup = async () => {
    if (!isAdd) {
      const form = document.getElementById("form");
      addDish.dish = dish;
      addDish.price = form[1].value;
      addDish.quantity = form[3].value;
      addDish.discount = form[2].value;
      await setDishes([...dishes, addDish]);
      setIsAdd(true);
    } else {
      alert("Please submit before you add new.");
    }
  };

  const addOrRemoveArray = (e) => {
    if (isAdd) {
      e.preventDefault();
      setIsAdd(false);
      var index = newDishes.find((d) => d.dish === dish);
      if (index) {
        alert("Bạn đã chọn sản phẩm này trước đó");
      } else {
        const form = document.getElementById("form");
        addDish.dish = dish;
        addDish.price = Number(form[1].value);
        addDish.quantity = Number(form[3].value);
        addDish.discount = Number(form[2].value);
        setNewDishes([...newDishes, addDish]);
        console.log(newDishes);
      }
    } else {
      console.log("Before", newDishes);
      const id = e.target.id;
      console.log(e.target.id);
      document.getElementById(id).remove();

      newDishes.splice(id, 1);
      setNewDishes(newDishes);
      console.log("After", newDishes);
    }
  };
  return (
    <Row>
      <Col xs={12} md={12}>
        <Form id={"form"} onSubmit={onTrigger}>
          <div className="d-flex justify-content-start">
            <Form.Group>
              <Form.Label htmlFor="dish">Search Dish</Form.Label>
              <Form.Group style={{ width: "200px" }}>
                <Select
                  required={true}
                  options={options}
                  onChange={handleSelectChange}
                />
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
                placeholder="Nhập giảm gia"
              />
            </Form.Group>
            <Form.Group className="ms-2">
              <Form.Label htmlFor="discount">Discount</Form.Label>
              <Form.Control
                name="discount"
                id="discount"
                type="number"
                max={100}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
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
              <Form.Label>Add</Form.Label>
              <Button
                className="form-control"
                variant="primary"
                onClick={addToGroup}
              >
                Add
              </Button>
            </Form.Group>
          </div>
          <Form.Group>
            {dishes.map((element, index) => {
              return (
                <div
                  key={index}
                  id={index}
                  className="mt-3 d-flex justify-content-start"
                >
                  <input
                    className="me-2 form-control"
                    onChange={() => {}}
                    value={element.dish}
                  />
                  <input
                    className="me-2 form-control"
                    onChange={() => {}}
                    value={element.price}
                  />
                  <input
                    className="me-2 form-control"
                    onChange={() => {}}
                    value={element.discount}
                  />
                  <input
                    className="me-2 form-control"
                    onChange={() => {}}
                    value={element.quantity}
                  />
                  <button
                    id={index}
                    onClick={addOrRemoveArray}
                    className="btn btn-danger"
                  >
                    Submit
                  </button>
                </div>
              );
            })}
          </Form.Group>
          <Form.Group>
            <Button variant="danger" type="submit">
              Add to order
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};
export default AddOrderDish;
