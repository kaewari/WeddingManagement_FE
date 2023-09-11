import { useEffect, useState } from "react";
import Apis, { SERVER, authApi, endpoints } from "../../../configs/Apis";
import {AiFillEdit, AiFillPlusCircle} from "react-icons/ai"
import {MdDeleteForever, MdOutlineFindInPage} from "react-icons/md"
import {GrFormView} from "react-icons/gr"
import {BiSolidDish} from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies"

const CustomerFeedback = () => {

    const [state, setState] = useState()
    const [kw, setKw] = useState({})
    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {
        const api = async () => {
            let response = await Apis.get(endpoints['feedback'] + "?customerId=" + (kw.customerId ?? "") + "&userId=" + (kw.userId ?? "")
                + "&replied=" + (kw.replied ?? ""), {baseURL: SERVER})
            setFeedbacks(response.data)
        }
        api()
    }, [state, kw])

    const deleteFeedback = async (e, feedbackId) => {
        try {
            const api = await authApi().delete(endpoints['feedback-delete'](feedbackId), {method: "DELETE", headers: {"Authorization": cookie.load("token").access_token}})
            setState({"deleteFeedback": "Delete feedback successfully", success: true});
        } catch (err) {
            setState({"deleteFeedback": "Delete feedback failed", success: false});
        }
    }

    return <>
        <div className="m-1 p-2">
        <span className="text-danger">{state && state.error}</span>
        <div className="d-flex justify-content-end">
            <input type="text" name="replied" onChange={(e) => {setKw({...kw, "customerId": e.target.value})}} placeholder="id cua khach hang" className="rounded mx-1"/>
            {/* <input type="text" name="replied" onChange={(e) => {setKw({...kw, "userId": e.target.value})}} placeholder="id cua admin, manager" className="rounded mx-1"/> */}
            <input type="checkbox" name="replied" onChange={() => {(kw.replied == null) ? setKw({...kw, replied: true}) : setKw({...kw, replied: !kw.replied})}}/>
            <label for="replied">{ kw.replied != null ? kw.replied ? "Replied" : "Not reply" : "Reply ?"}</label>
        </div>
        <table class="table table-hover table-default">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Customer</th>
                <th scope="col">Function</th>
            </tr>
            </thead>
            <tbody>
            {feedbacks != null && feedbacks.slice(0).reverse().map((feedback, index) => 
                <tr className={feedback.reply ? "table-active" : ""} key={index}> 
                <th scope="row">{feedback.id}</th>
                <td>{feedback.comment}</td>
                <td>{feedback.whatCustomer.name}</td>
                <td>
                    <div>
                    <Link className="text-decoration-none" to={"/admin/feedback/view?id=" + feedback.id} ><GrFormView /> View</Link>
                    <Link className="text-decoration-none" to={"/admin/feedback/view?id=" + feedback.id + "&reply=" + true}><AiFillEdit /> Reply</Link>
                    <Link className="text-decoration-none" too="" onClick={(e) => {deleteFeedback(e, feedback.id)}} ><MdDeleteForever />Delete</Link>
                    </div>
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    </>
}

export default CustomerFeedback;