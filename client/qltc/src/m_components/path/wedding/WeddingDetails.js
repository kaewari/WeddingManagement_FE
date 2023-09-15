import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
import ViewDish from "../dish/ViewDish";
import { Form } from "react-bootstrap";

const WeddingDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [q] = useSearchParams();
  const [wedding, setWedding] = useState({});
  const weddingId = q.get("id");
  useEffect(() => {
    setLoading(true);
    const getOrderDetails = async () => {
      try {
        const res = await authApi()
          .get(endpoints["wedding-details"](weddingId))
          .catch((res) => {
            setError(res.response.data);
          })
          .finally(() => {
            setLoading(false);
          });
        setWedding(res.data);
        console.log(res.data);
      } catch (err) {
        setError("Lỗi khi thêm dữ liệu vào hệ thống.");
      }
    };
    getOrderDetails();
  }, [weddingId]);
  if (loading) return <MySpinner />;
  return (
    <>
      <h1>{error}</h1>
      <h3>Mã số wedding: {weddingId}</h3>
      <Link
        to={"/admin/wedding/edit?id=" + weddingId}
        className="btn btn-secondary"
      >
        You need to update?
      </Link>
      {wedding != null && (
        <div className="container">
          <p>
            Total: <span className="fw-bold"> {wedding.totalLeft}</span>
          </p>
          <p>
            Discount: <span className="fw-bold"> {wedding.deposit}</span>
          </p>
          <p>
            Receipt number:
            <span className="fw-bold"> {wedding.receiptNo}</span>
          </p>
          <p>
            Paid via: <span className="fw-bold"> {wedding.paidVia}</span>
          </p>
          <p>
            Note: <span className="fw-bold"> {wedding.discount}</span>
          </p>
          <p>
            Celebrity date:
            <span className="fw-bold">
              {new Date(wedding.celebrityDate).toLocaleString("vn")}
            </span>
          </p>
          <p>
            Table number:
            <span className="fw-bold">{wedding.tableNumber}</span>
          </p>
          <p>
            Guest number:
            <span className="fw-bold">{wedding.guestNumber}</span>
          </p>
          <p>
            Description:
            <span className="fw-bold">{wedding.description}</span>
          </p>
          <p>
            Created date:
            <span className="fw-bold">
              {new Date(wedding.createdDate).toLocaleString("vn")}
            </span>
          </p>
          <h3>Thông tin nhân viên</h3>
          <p>
            <div className="border round m-1 p-2">
              <span>
                {wedding.whatUser != null ? (
                  <div className="border rounded m-2 p-2">
                    <h5>Customer id: {wedding.whatUser.id}</h5>
                    <p>
                      Name:
                      <span className="fw-bold">{wedding.whatUser.name}</span>
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
          <h3>Thông tin khách hàng</h3>
          <p>
            <div className="border round m-1 p-2">
              <span>
                {wedding.whatCustomer != null ? (
                  <div className="border rounded m-2 p-2">
                    <h5>Employee id: {wedding.whatCustomer.id}</h5>
                    <p>
                      Name:
                      <span className="fw-bold">
                        {wedding.whatCustomer.name}
                      </span>
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
          <h3>Thông tin chi tiết hoá đơn</h3>
          <p>
            {wedding.order != null && (
              <div className="m-1 p-2 border rounded">
                <h4>
                  Id: <span className="fw-bold"> {wedding.order.id}</span>
                </h4>
                <p>
                  Total:
                  <span className="fw-bold"> {wedding.order.total}</span>
                </p>
                <p>
                  Paid Via:
                  <span className="fw-bold"> {wedding.order.paidVia}</span>
                </p>
                <p>
                  Receipt Number:
                  <span className="fw-bold"> {wedding.order.receiptNo}</span>
                </p>
                <p>
                  Discount:
                  <span className="fw-bold"> {wedding.order.discount}</span>
                </p>
                <p>
                  Note:
                  <span className="fw-bold"> {wedding.order.note}</span>
                </p>
              </div>
            )}
          </p>
        </div>
      )}
    </>
  );
};
export default WeddingDetails;
