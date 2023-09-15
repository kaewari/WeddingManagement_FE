import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
import ViewDish from "../dish/ViewDish";
import { Form } from "react-bootstrap";

const OrderDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [q] = useSearchParams();
  const [order, setOrder] = useState({});
  const orderId = q.get("id");
  useEffect(() => {
    setLoading(true);
    const getOrderDetails = async () => {
      try {
        const res = await authApi()
          .get(endpoints["order-details"](orderId))
          .catch((res) => {
            setError(res.response.data);
          })
          .finally(() => {
            setLoading(false);
          });
        setOrder(res.data);
        console.log(res.data);
      } catch (err) {
        setError("Lỗi khi thêm dữ liệu vào hệ thống.");
      }
    };
    getOrderDetails();
  }, [orderId]);
  if (loading) return <MySpinner />;
  return (
    <>
      <h1>{error}</h1>
      <h3>Mã số hoá đơn: {orderId}</h3>
      <Link
        to={"/admin/order/edit?id=" + orderId}
        className="btn btn-secondary"
      >
        You need to update?
      </Link>
      {order != null && (
        <div className="container">
          <p>
            Total: <span className="fw-bold"> {order.total}</span>
          </p>
          <p>
            Discount: <span className="fw-bold"> {order.discount}</span>
          </p>
          <p>
            Receipt number:
            <span className="fw-bold"> {order.receiptNo}</span>
          </p>
          <p>
            Paid via: <span className="fw-bold"> {order.paidVia}</span>
          </p>
          <p>
            Note: <span className="fw-bold"> {order.note}</span>
          </p>
          <p>
            Created date:
            <span className="fw-bold">
              {new Date(order.createdDate).toLocaleString("vn")}
            </span>
          </p>
          <h3>Thông tin khách mua hàng</h3>
          <p>
            <div className="border round m-1 p-2">
              <span>
                {order.whatCustomer != null ? (
                  <div className="border rounded m-2 p-2">
                    <h5>Customer id: {order.whatCustomer.id}</h5>
                    <p>
                      Name:
                      <span className="fw-bold">{order.whatCustomer.name}</span>
                    </p>
                  </div>
                ) : (
                  <span className="text-secondary">
                    No any customer at the moment.
                  </span>
                )}
              </span>
            </div>
          </p>
          <h3>Thông tin nhân viên bán hàng</h3>
          <p>
            <div className="border round m-1 p-2">
              <span>
                {order.whatStaff != null ? (
                  <div className="border rounded m-2 p-2">
                    <h5>Employee id: {order.whatStaff.id}</h5>
                    <p>
                      Name:
                      <span className="fw-bold"> {order.whatStaff.name}</span>
                    </p>
                  </div>
                ) : (
                  <span className="text-secondary">
                    No any employee at the moment.
                  </span>
                )}
              </span>
            </div>
          </p>
          <h3>Thông tin chi tiết hoá đơn món ăn</h3>
          <p>
            {order != null &&
              order.orderDetailsDishes != null &&
              order.orderDetailsDishes.map((o) => (
                <div className="m-1 p-2 border rounded">
                  <h4>
                    Id: <span className="fw-bold">{o.id}</span>
                  </h4>
                  <p>
                    Quantity: <span className="fw-bold">{o.quantity}</span>
                  </p>
                  <p>
                    Price:
                    <span className="fw-bold">{o.price}</span>
                  </p>
                  <p>
                    Discount:
                    <span className="fw-bold">{o.discount}</span>
                  </p>
                  <p>
                    Note:
                    <span className="fw-bold">{o.note}</span>
                  </p>
                  <div className="border round m-2 p-2">
                    Dish:
                    <span className="fw-bold">
                      <ViewDish id={o.dish.id} />
                    </span>
                  </div>
                </div>
              ))}
          </p>
          <h3>Thông tin chi tiết hoá đơn sảnh cưới</h3>
          <p>
            {order != null &&
              order.orderDetailsHalls != null &&
              order.orderDetailsHalls.map((o) => (
                <div className="m-1 p-2 border rounded">
                  <h4>
                    Id: <span className="fw-bold">{o.id}</span>
                  </h4>
                  <p>
                    Price:
                    <span className="fw-bold">{o.price}</span>
                  </p>
                  <p>
                    Discount:
                    <span className="fw-bold">{o.discount}</span>
                  </p>
                  <div className="border round m-1 p-2">
                    <span className="fw-bold">
                      {o.orderDetailsHalls > 0 ? (
                        o.orderDetailsHalls.map((price) => (
                          <div className="border rounded m-2 p-2">
                            <h5>Hall Price id: {price.id}</h5>
                            <p>
                              Peiod:=
                              <span className="fw-bold">{price.period}</span>
                            </p>
                            <p>
                              Price:
                              <span className="fw-bold">{price.price}</span>
                            </p>
                            <p>
                              Discount:
                              <span className="fw-bold">{price.discount}</span>
                            </p>
                          </div>
                        ))
                      ) : (
                        <span className="text-secondary">
                          No any hall price at the moment.
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
          </p>
          <h3>Thông tin chi tiết hoá đơn dịch vụ</h3>
          <p>
            <div className="border round m-1 p-2">
              <span className="fw-bold">
                {order.orderDetailsServices != null ? (
                  order.orderDetailsServices.map((s) => (
                    <div className="border rounded m-2 p-2">
                      <h5>Service id: {s.id}</h5>
                      <p>
                        Name
                        <span className="fw-bold">{s.name}</span>
                      </p>
                      <p>
                        ModifiedBy:
                        <span className="fw-bold">{s.modifiedBy}</span>
                      </p>
                      <p>
                        Is Available:
                        <input
                          type="radio"
                          id="service-enable"
                          name="isAvailable"
                          value={true}
                          defaultChecked={s.isAvailable}
                        />
                        <label for="service-enable"> Yes </label>
                        <input
                          type="radio"
                          id="service-disable"
                          name="isAvailable"
                          value={false}
                          defaultChecked={!s.isAvailable}
                        />
                        <label for="service-disable"> No </label>
                      </p>
                    </div>
                  ))
                ) : (
                  <span className="text-secondary">
                    No any service at the moment.
                  </span>
                )}
              </span>
            </div>
          </p>
        </div>
      )}
    </>
  );
};
export default OrderDetails;
