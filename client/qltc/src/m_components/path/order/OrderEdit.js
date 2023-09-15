import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";

const OrderEdit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [q] = useSearchParams();
  const [order, setOrder] = useState({});
  const [message, setMessage] = useState("");
  const orderId = q.get("id");
  useEffect(() => {
    setLoading(true);
    const getOrderDetails = async () => {
      try {
        const res = await authApi()
          .get(endpoints["order-details"](orderId))
          .catch((res) => {
            if (res.response.status === 404) setError("Not found this order");
          })
          .finally(() => {
            setLoading(false);
          });
        setOrder(res.data);
        console.log(res.data);
      } catch (err) {
        setOrder(null);
      }
    };
    getOrderDetails();
  }, [orderId]);
  const removeOrder = async (e) => {
    e.preventDefault();
    await authApi()
      .delete(endpoints["order-delete"](orderId))
      .then((res) => {
        if (res.status === 204) setMessage("Delete successfully");
      })
      .catch((res) => {
        if (res.status === 404) setMessage("Delete failure");
      });
  };
  const updateOrder = async (e) => {
    e.preventDefault();
    await authApi()
      .put(endpoints["order-update"](orderId), {
        total: order.total,
        discount: order.discount,
        paidVia: order.paidVia,
        note: order.note,
        receiptNo: order.receiptNo,
      })
      .then((res) => {
        if (res.status === 202) setMessage("Update successfully");
      })
      .catch((res) => {
        if (res.status === 400) setMessage("Cannot update");
      });
  };
  if (loading) return <MySpinner />;
  return (
    <>
      {order != null ? (
        <div>
          <h1 className="text-danger">{error}</h1>
          <h1 className="text-info">{message}</h1>
          <h3>Mã số hoá đơn: {orderId}</h3>
          <Link
            to={"/admin/order/view?id=" + orderId}
            className="btn btn-secondary"
          >
            You need to watch details?
          </Link>
          <div className="container">
            <Form onSubmit={updateOrder}>
              <Form.Group>
                <Form.Label>Total</Form.Label>
                <Form.Control
                  name="total"
                  type="number"
                  value={order.total}
                  onChange={(e) => {
                    setOrder({ total: e.target.value });
                  }}
                  required={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  name="discount"
                  type="number"
                  value={order.discount}
                  onChange={(e) => {
                    setOrder({ discount: e.target.value });
                  }}
                  required={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Receipt Number</Form.Label>
                <Form.Control
                  name="receiptNo"
                  type="text"
                  value={order.receiptNo}
                  onChange={(e) => {
                    setOrder({ receiptNo: e.target.value });
                  }}
                  required={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Paid Via</Form.Label>
                <Form.Control
                  name="paidVia"
                  type="text"
                  value={order.paidVia}
                  onChange={(e) => {
                    setOrder({ paidVia: e.target.value });
                  }}
                  required={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Note</Form.Label>
                <Form.Control
                  name="note"
                  type="text"
                  value={order.note}
                  onChange={(e) => {
                    setOrder({ note: e.target.value });
                  }}
                  required={true}
                />
              </Form.Group>
              <Form.Group>
                <Button className="mt-2" variant="primary" type="submit">
                  Update order
                </Button>
                <Button
                  onClick={removeOrder}
                  className="mt-2 ms-2"
                  variant="danger"
                  type="submit"
                >
                  Delete order
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      ) : (
        <h1 className="text-danger">{error}</h1>
      )}
    </>
  );
};
export default OrderEdit;
