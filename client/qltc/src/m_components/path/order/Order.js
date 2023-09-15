import { useEffect, useState } from "react";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
import { AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { MdDeleteForever, MdOutlineFindInPage } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { SiPaypal } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [kw, setKw] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [state, setState] = useState(true);
  const [time, setTime] = useState({ fromDate: null, toDate: null });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    let fromDate =
      time.fromDate != null
        ? "&fromDate=" + new Date(time.fromDate).toLocaleDateString("en-GB")
        : "";
    if (fromDate != null) fromDate = fromDate.replaceAll("/", "-");
    let toDate =
      time.toDate != null
        ? "&toDate=" + new Date(time.toDate).toLocaleDateString("en-GB")
        : "";
    if (toDate != null) toDate = toDate.replaceAll("/", "-");
    let api = async (pageSize, pageIndex) => {
      let { data } = await authApi()
        .get(
          endpoints["orders"] +
            "?pageIndex=" +
            pageIndex +
            "&pageSize=" +
            pageSize +
            fromDate +
            toDate
        )
        .finally(setLoading(false));
      setOrders(data);
    };
    api(100, 1);
  }, [kw, state, time]);
  if (orders === null) return <MySpinner />;

  const deleteOrder = async (e, id) => {
    e.preventDefault();

    try {
      const request = await authApi().delete(endpoints["order-delete"](id), {
        method: "DELETE",
        headers: { Authorization: cookie.load("token").access_token },
      });
      if (request.status === 204) {
        setState(!state);
      } else if (request.status === 404) {
        setError("Not found that order");
      } else {
        setError("Error when trying to delete order.");
      }
    } catch (err) {
      setError("Error when trying to delete order.");
    }
  };
  if (loading) return <MySpinner />;
  return (
    <>
      <div className="d-flex justify-content-end me-2">
        <div className="text-primary">
          <Link to="/admin/order/create">
            <AiFillPlusCircle /> Create a new order{" "}
          </Link>
        </div>
        <div>
          {" "}
          From Date:{" "}
          <input
            type="date"
            name="fromDate"
            onChange={(e) => {
              setTime({ ...time, fromDate: e.target.value });
            }}
          />
          To Date:{" "}
          <input
            type="date"
            name="toDate"
            onChange={(e) => {
              setTime({ ...time, toDate: e.target.value });
              console.log(e);
            }}
          />
        </div>
      </div>
      <span className="text-danger">{error}</span>
      <table className="table table-hover table-default">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Customer</th>
            <th scope="col">Total</th>
            <th scope="col">Discount</th>
            <th scope="col">Created Date</th>
            <th scope="col">isPaid</th>
            <th scope="col">Function</th>
          </tr>
        </thead>
        <tbody>
          {orders != null &&
            orders
              .slice(0)
              .reverse()
              .map((order) => (
                <tr className={!order.receiptNo ? "table-active" : ""}>
                  <th scope="row">{order.id}</th>
                  <td>{order.whatCustomer.name}</td>
                  <td>{order.total}</td>
                  <td>{order.discount}</td>
                  <td>{new Date(order.createdDate).toLocaleString()}</td>
                  <td>{order.receiptNo ? "Yes" : "No"}</td>
                  <td>
                    <div>
                      <Link
                        className="text-decoration-none"
                        to={"/admin/order/view?id=" + order.id}
                      >
                        <GrFormView /> View
                      </Link>
                      <Link
                        className="text-decoration-none"
                        to={"/admin/order/edit?id=" + order.id}
                      >
                        <AiFillEdit /> Edit
                      </Link>
                      {/* after 5 minutes cannot delete */}
                      {new Date().getTime() - 5 * 60 <
                        new Date(order.createdDate).getTime() && (
                        <Link
                          className="text-decoration-none"
                          too=""
                          onClick={(e) => {
                            deleteOrder(e, order.id, order.isActive);
                          }}
                        >
                          <MdDeleteForever />
                          Delete
                        </Link>
                      )}
                      {!order.receiptNo && (
                        <Link
                          className="text-decoration-none"
                          too=""
                          onClick={(e) => {
                            deleteOrder(e, order.id, order.isActive);
                          }}
                        >
                          <SiPaypal />
                          Pay
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
};

export default Order;
