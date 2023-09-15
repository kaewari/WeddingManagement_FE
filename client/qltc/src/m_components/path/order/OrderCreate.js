import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
import ViewDish from "../dish/ViewDish";
const OrderCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState({
    total: "",
    discount: 0,
    receiptNo: "",
    paidVia: "",
    note: "",
    createDate: "",
  });
  if (loading) return <MySpinner />;
  return (
    <>
      <h1>{error}</h1>
      <h3>Tạo hoá đơn</h3>
      {order != null && (
        <div className="container">
          <label htmlFor="total">Total</label>
          <input
            name="total"
            type="number"
            placeholder="Nhập tổng cộng"
            onChange={(e) => setOrder({ total: e.target.value })}
            value={order.total}
            required={true}
          />
          <label htmlFor="discount">Discount</label>
          <input
            name="discount"
            type="number"
            placeholder="Nhập giảm giá"
            onChange={(e) => setOrder({ discount: e.target.value })}
            value={order.discount}
            required={true}
          />
          <label htmlFor="receiptNo">Receipt Number</label>
          <input
            name="receiptNo"
            type="number"
            placeholder="Nhập số hoá đơn"
            onChange={(e) => setOrder({ receiptNo: e.target.value })}
            value={order.receiptNo}
            required={true}
          />
          <label htmlFor="paidVia">Paid Via</label>
          <input
            name="paidVia"
            type="text"
            placeholder="Nhập phương thức thanh toán"
            onChange={(e) => setOrder({ paidVia: e.target.value })}
            value={order.paidVia}
            required={true}
          />
          <label htmlFor="note">Note</label>
          <input
            name="note"
            type="text"
            placeholder="Nhập ghi chú"
            onChange={(e) => setOrder({ note: e.target.value })}
            value={order.note}
          />
        </div>
      )}
    </>
  );
};
export default OrderCreate;
