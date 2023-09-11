import axios from "axios";
import { useEffect, useState } from "react";
import cookie from "react-cookies";
import { AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { BiSolidDish } from "react-icons/bi";
import { GrFormView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";

const WeddingService = () => {
    const [services, setServices] = useState([])
    const [kw, setKw] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [state, setState] = useState(true)

    useEffect(() => {
        let api = async (pageSize, pageIndex) => {
        let {data} = await axios.get(endpoints['services'])
        setServices(data)}
        api(100, 1)
    }, [kw, state])
    if (services === null) return <MySpinner />;
    
    const deleteService = async (e, id) => {
      e.preventDefault();
      
      try {
        const request = await authApi().delete(endpoints['service-delete'](id), {method: "DELETE", headers: {"Authorization": cookie.load("token").access_token}})
        if (request.status === 204) {
          setState(!state)
        } 
        setError("")
      } catch (err) {
        const request = err.request
        if (request.status == 404) {
          setError("Not found that service")
        } else if (request.status == 500) {
          setError("Cannot delete because of foreign key other table.")
        }  else {
          setError("Error when trying to delete service.")
        }
      }
    }

    const deactivateService = async (e, id, isAvailable) => {
      e.preventDefault()
      const action = isAvailable ? "deactivate" : "activate";
      try {
        const request = await authApi().post(isAvailable ? endpoints['service-deactivate'](id) : endpoints['service-activate'](id))
        if (request.status == 202) {
          setState(!state)
        }
        setError("")
      } catch (err) {
        const request = err.request
        if (request.status == 404) {
          setError("Not found that service")
        } else if (request.status == 500) {
          setError("Error when trying to " + action + " service.")
        }  else {
          setError("Error when trying to " + action + " service.")
        }
      }
    }

    return <>
        <div className="d-flex justify-content-end me-2">
          <div className="text-primary"><Link to="/admin/wedding-service/create"><AiFillPlusCircle /> Create a new service </Link></div>
        </div>
        <span className="text-danger">{error}</span>
        <table class="table table-hover table-default">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Is Available</th>
            <th scope="col">Function</th>
          </tr>
        </thead>
        <tbody>
          {services != null && services.slice(0).reverse().map((service, index) => 
            <tr className={!service.isAvailable ? "table-active" : ""} key={index}> 
              <th scope="row">{service.id}</th>
              <td>{service.name}</td>
              <td>{service.isAvailable ? "Yes" : "No"}</td>
              <td>
                <div>
                  <Link className="text-decoration-none" to={"/admin/wedding-service/view?id=" + service.id} ><GrFormView /> View</Link>
                  <Link className="text-decoration-none" to={"/admin/wedding-service/edit?id=" + service.id}><AiFillEdit /> Edit</Link>
                  {/* after 5 minutes cannot delete */}
                  { !service.isCompleted &&
                    <Link className="text-decoration-none" too="" onClick={(e) => {deleteService(e, service.id)}} ><MdDeleteForever />Delete</Link>
                  }
                  <Link className="text-decoration-none" too="" onClick={(e) => {deactivateService(e, service.id, service.isAvailable)}} ><BiSolidDish />
                    {service.isAvailable ? "Deactivate" : "Activate"}</Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
}

export default WeddingService;