import { useEffect, useState } from "react";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
import {AiFillEdit, AiFillPlusCircle} from "react-icons/ai"
import {MdDeleteForever, MdOutlineFindInPage} from "react-icons/md"
import {BiSolidDish} from "react-icons/bi"
import {GrFormView} from "react-icons/gr"
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies"

const Dish = () => {
    
    const [dishes, setDishes] = useState([])
    const [kw, setKw] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [state, setState] = useState(true)

    useEffect(() => {
      let api = async (pageSize, pageIndex) => {
        let {data} = await Apis.get(endpoints['dishes'] + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize + (kw ? "&keyword=" + kw : ""))
        setDishes(data)
      }
      api(100, 1)
    }, [kw, state]);
    if (dishes === null) return <MySpinner />;
    
    const deleteDish = async (e, id) => {
      e.preventDefault();
      
      try {
        const request = await authApi().delete(endpoints['dish-delete'](id), {method: "DELETE", headers: {"Authorization": cookie.load("token").access_token}})
        if (request.status == 204) {
          setState(!state)
        } else if (request.status == 404) {
          setError("Not found that dish")
        } else {
          setError("Error when trying to delete dish.")
        }
      } catch (err) {
        setError("Error when trying to delete dish.")
      }
    }

    const deactivateDish = async (e, id, isActive) => {
      e.preventDefault()
      const url = isActive ? endpoints['dish-deactivate'](id) : endpoints['dish-activate'](id)
      const action = isActive ? "deactivate" : "activate"

      try {
        const request = await authApi().post(url)
        if (request.status == 200) {
          setState(!state)
        } else if (request.status == 404) {
          setError("Not found that dish")
        } else {
          setError("Error when trying to " + action + " dish.")
        }
      } catch (err) {
        setError("Error when trying to " + action + " dish.")
      }
    }

    return <>
        <div className="d-flex justify-content-end me-2">
          <div className="text-primary"><Link to="/admin/dish/create"><AiFillPlusCircle /> Create a new dish </Link></div>
          <div> <MdOutlineFindInPage /> <input className="border rounded" name="kw" placeholder="Tim kiem" onChange={(e) => {setKw(e.target.value)}}/></div>
        </div>
        <span className="text-danger">{error}</span>
        <table class="table table-hover table-default">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Discount</th>
            <th scope="col">Unit</th>
            <th scope="col">Type</th>
            <th scope="col">Function</th>
          </tr>
        </thead>
        <tbody>
          {dishes != null && dishes.map((dish) => 
            <tr className={!dish.isAvailable ? "table-active" : ""}>
              <th scope="row">{dish.id}</th>
              <td>{dish.name}</td>
              <td>{dish.price}</td>
              <td>{dish.discount}</td>
              <td>{dish.unit}</td>
              <td>{dish.type}</td>
              <td>
                <div>
                  <Link className="text-decoration-none" to={"/admin/dish/view?id=" + dish.id} ><GrFormView /> View</Link>
                  <Link className="text-decoration-none" to={"/admin/dish/edit?id=" + dish.id}><AiFillEdit /> Edit</Link>
                  <Link className="text-decoration-none" to="" onClick={(e) => {deleteDish(e, dish.id)}}><MdDeleteForever />Delete</Link>
                  <Link className="text-decoration-none" too="" onClick={(e) => {deactivateDish(e, dish.id, dish.isAvailable)}} ><BiSolidDish />
                    {dish.isAvailable ? "Deactivate" : "Activate"}</Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
}

export default Dish;