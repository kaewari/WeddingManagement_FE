import { useEffect, useState } from "react";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
import {AiFillEdit, AiFillPlusCircle} from "react-icons/ai"
import {MdDeleteForever, MdOutlineFindInPage} from "react-icons/md"
import {GrFormView} from "react-icons/gr"
import {SiPaypal} from "react-icons/si"
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies"

const Wedding = () => {
    const [orders, setOrders] = useState([])
    const [kw, setKw] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [state, setState] = useState(true)
    const [filter, setFilter] = useState({
        "allPaid": null,
        "completed": null,
        "onlyDeposit": null
    })

    useEffect(() => {
        let api = async (pageSize, pageIndex) => {
        let {data} = await authApi().get(endpoints['wedding'] + (filter.allPaid ? "?allPaid=" + filter.allPaid : "") 
        + (filter.completed ? "?completed="  + filter.completed : "") + (filter.onlyDeposit ? "?onlyDeposit="  + filter.onlyDeposit : ""))
        setOrders(data)}
        api(100, 1)
    }, [kw, state, filter])
    if (orders === null) return <MySpinner />;
    
    const deleteOrder = async (e, id) => {
      e.preventDefault();
      
      try {
        const request = await authApi().delete(endpoints['order-delete'](id), {method: "DELETE", headers: {"Authorization": cookie.load("token").access_token}})
        if (request.status == 204) {
          setState(!state)
        } else if (request.status == 404) {
          setError("Not found that order")
        } else {
          setError("Error when trying to delete order.")
        }
      } catch (err) {
        setError("Error when trying to delete order.")
      }
    }

    return <>
        <div className="d-flex justify-content-end me-2">
          <div className="text-primary"><Link to="/admin/order/create"><AiFillPlusCircle /> Create a new order </Link></div>
          <div> 
            {/* <input type="checkbox" id='allPaid' name="allPaid" onChange={() => {(filter.allPaid == null) ? setFilter({...filter, allPaid: true}) : setFilter({...filter, allPaid: false})}} />
            <label for="allPaid" >All Paid?</label> */}
            <input type="checkbox" id='completed' name="completed" onChange={() => {(filter.completed == null) ? setFilter({...filter, completed: true}) : setFilter({...filter, completed: !filter.completed})}} />
            <label for="completed" > {filter.completed == null ? "Is Completed?" : ((filter.completed) ? "Completed" : "Not completed")}</label>
            {/* <input type="checkbox" id='onlyDeposit' name="onlyDeposit" onChange={() => {(filter.onlyDeposit == null) ? setFilter({...filter, onlyDeposit: true}) : setFilter({...filter, onlyDeposit: false})}} />
            <label for="onlyDeposit" >Have Deposit?</label> */}
          </div>
        </div>
        <span className="text-danger">{error}</span>
        <table class="table table-hover table-default">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Customer</th>
            <th scope="col">Total</th>
            <th scope="col">Celebrity</th>
            <th scope="col">Created Date</th>
            <th scope="col">isPaid</th>
            <th scope="col">Function</th>
          </tr>
        </thead>
        <tbody>
          {orders != null && orders.slice(0).reverse().map((order, index) => 
            <tr className={!order.receiptNo ? "table-active" : ""} key={index}> 
              <th scope="row">{order.id}</th>
              <td>{order.whatCustomer.name}</td>
              <td>Current: {order.deposit + order.totalLeft}</td>
              <td>{new Date (order.celebrityDate).toLocaleDateString("en-GB")}</td>
              <td>{new Date(order.createdDate).toLocaleString()}</td>
              <td>{order.receiptNo ? "Yes" : "No"}</td>
              <td>
                <div>
                  <Link className="text-decoration-none" to={"/admin/order/view?id=" + order.id} ><GrFormView /> View</Link>
                  <Link className="text-decoration-none" to={"/admin/order/edit?id=" + order.id}><AiFillEdit /> Edit</Link>
                  {/* after 5 minutes cannot delete */}
                  { !order.isCompleted &&
                    <Link className="text-decoration-none" too="" onClick={(e) => {deleteOrder(e, order.id, order.isActive)}} ><MdDeleteForever />Delete</Link>
                  }
                  { !order.receiptNo &&
                    <Link className="text-decoration-none" too="" onClick={(e) => {deleteOrder(e, order.id, order.isActive)}} ><SiPaypal />Pay</Link>}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
}

export default Wedding;