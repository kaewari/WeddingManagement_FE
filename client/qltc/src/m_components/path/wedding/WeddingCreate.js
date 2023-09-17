import { Navigate, useNavigate } from "react-router-dom";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../../../App";
import cookie from "react-cookies";
import ChooseHallPrice from "./details/ChooseHallPrice";
import ChooseDish from "./details/ChooseDish";
import ChooseService from "./details/ChooseService";

const WeddingCreate = () => {
  const [user, dispatch] = useContext(MyUserContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [dataList, setDataList] = useState({
    userList: [],
    branchList: [],
    hallList: [],
    hallPriceList: [],
  });
  const [selection, setSelection] = useState({});
  const [dishes, setDishes] = useState([]);
  const [hallPrice, setHallPrice] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const api = async () => {
      var data = {};
      const users = await authApi().get(endpoints["users"]);
      const branches = await authApi().get(endpoints["branches"]);
      if (selection.branch != null && selection.branch > 0) {
        const halls = await authApi().get(
          endpoints["branch-halls"](selection.branch)
        );
        data = { ...data, hallList: halls.data };
        if (selection.hall && selection.hall > 0) {
          var hall = halls.data.filter((hall) => hall.id == selection.hall)[0];
          if (hall != null) data = { ...data, hallPriceList: hall.prices };
        }
      }

      setDataList({ ...data, userList: users.data, branchList: branches.data });
    };
    api();
  }, [selection]);

  const submit = async (e) => {
    e.preventDefault();
    var formData = new FormData(e.currentTarget);
    var customer = parseInt(formData.get("customerId"));
    var data = {
      discount: 0,
      customer: customer,
      staff: user.id,
      wedding: {
        tableNumber: parseInt(formData.get("tableNumber")),
        guestNumber: parseInt(formData.get("guestNumber")),
        description: formData.get("description"),
        celebrityDate: formData.get("celebrityDate"),
        customer: customer,
      },
      orderDetailsDishes: dishes,
      orderDetailsHalls: hallPrice,
      orderDetailsServices: [],
    };
    console.log(data);

    try {
      const response = authApi().post(endpoints["wedding-create"], data);
      console.log(1);
      navigate(-1);
    } catch (err) {
      setError({ general: "Cannot create this wedding order." });
    }
  };

  return (
    <>
      <div className="border rounded p-2 m-1">
        <h2>Thong tin wedding</h2>
        <form
          onSubmit={(e) => {
            submit(e);
          }}
        >
          <label for="select-customer" className="me-2 py-2">
            Khach hang:{" "}
          </label>
          <select id="select-customer" name="customerId" required={true}>
            <option key={-1} value="">
              Chon khach hang
            </option>
            {dataList.userList &&
              dataList.userList.map((user) => (
                <>
                  <option key={user.id} value={user.id}>
                    {user.name} {"{" + user.phone + "}"}
                  </option>
                </>
              ))}
          </select>{" "}
          <br></br>
          <label for="description" className="py-2">
            Description
          </label>
          <textarea
            rows={5}
            maxLength={500}
            id="description"
            name="description"
            className="form-control"
            required={true}
          />
          <label for="tableNumber" className="py-2">
            Table number
          </label>
          <input
            type="text"
            id="tableNumber"
            name="tableNumber"
            className="form-control"
            required={true}
          />
          <label for="guestNumber" className="py-2">
            Guest number
          </label>
          <input
            type="guestNumber"
            id="guestNumber"
            name="guestNumber"
            className="form-control"
            required={true}
          />
          <label for="celebrityDate" className="py-2">
            Celebrity Date
          </label>
          <input
            type="datetime-local"
            id="celebrityDate"
            name="celebrityDate"
            className="form-control"
            required={true}
          />
          <label for="deposit" className="py-2">
            Deposit :vnd
          </label>
          <input
            type="text"
            id="deposit"
            name="deposit"
            className="form-control"
            required={true}
          />
          <label for="discount" className="py-2">
            Discount :vnd
          </label>
          <input
            type="text"
            id="discount"
            name="discount"
            className="form-control"
            required={true}
          />
          <label for="receiptNo" className="py-2">
            Receipt No.
          </label>
          <input
            type="text"
            id="receiptNo"
            name="receiptNo"
            className="form-control"
            required={true}
          />
          <label for="paidVia" className="py-2">
            Paid via
          </label>
          <input
            type="text"
            id="paidVia"
            name="paidVia"
            className="form-control"
            required={true}
          />
          <div className="m-1 p-2 border rounded">
            <div className="fw-bold">Thong tin sanh cuoi</div>
            <label for="select-branch" className="me-2 my-2">
              Chi nhanh:
            </label>
            <select
              id="select-branch"
              onChange={(e) => {
                e.target.value > 0 &&
                  setSelection({ ...selection, branch: e.target.value });
              }}
              required={true}
            >
              <option key={-1} value={-1}>
                Chon chi nhanh
              </option>
              {dataList.branchList &&
                dataList.branchList.map((branch) => (
                  <>
                    <option key={branch.id} value={branch.id}>
                      {"Tinh/TP " +
                        branch.province +
                        "  Quan/Huyen " +
                        branch.district +
                        " Phuong/Xa " +
                        branch.ward +
                        " Khu pho/Thon " +
                        branch.quarter +
                        " So " +
                        branch.houseNumber}
                    </option>
                  </>
                ))}
            </select>
            <ChooseHallPrice
              selection={selection}
              setSelection={setSelection}
              dataList={dataList}
              setHallPrice={setHallPrice}
              hallPrice={hallPrice}
            />
          </div>
          <ChooseDish dishes={dishes} setDishes={setDishes} />
          <ChooseService
            services={services}
            setServices={setServices}
            selecttion={selection}
            setSelection={setSelection}
          />
          <br></br>
          <button type="submit" className="btn btn-primary my-2">
            Tao don hang
          </button>
          <span className="text-danger">{error.general}</span>
        </form>
      </div>
    </>
  );
};

export default WeddingCreate;
