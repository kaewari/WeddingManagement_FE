import { useEffect, useState } from "react";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";
import {AiFillEdit, AiFillPlusCircle} from "react-icons/ai"
import {MdDeleteForever, MdOutlineFindInPage} from "react-icons/md"
import {BiSolidDish} from "react-icons/bi"
import {GrFormView} from "react-icons/gr"
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies"

const Branch = () => {
    const [branches, setBranches] = useState([])
    const [kw, setKw] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [state, setState] = useState(true)

    useEffect(() => {
      let api = async (pageSize, pageIndex) => {
        let {data} = await Apis.get(endpoints['branches'] + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize + (kw ? "&province=" + kw : ""))
        setBranches(data)
      }
      api(100, 1)
    }, [kw, state]);
    if (branches === null) return <MySpinner />;
    
    const deleteBranch = async (e, id) => {
      e.preventDefault();
      
      try {
        const request = await authApi().delete(endpoints['branch-delete'](id), {method: "DELETE", headers: {"Authorization": cookie.load("token").access_token}})
        if (request.status == 204) {
          setState(!state)
        } else if (request.status == 404) {
          setError("Not found that branch")
        } else {
          setError("Error when trying to delete branch.")
        }
      } catch (err) {
        setError("Error when trying to delete branch.")
      }
    }

    const deactivateBranch = async (e, id, isActive) => {
      e.preventDefault()
      const url = (isActive ? endpoints['branch-deactivate'](id) : endpoints['branch-activate'](id))
      const action = isActive ? "deactivate" : "activate"

      try {
        const request = await authApi().put(url)
        if (request.status == 200) {
          setState(!state)
        } else if (request.status == 404) {
          setError("Not found that branch")
        } else {
          setError("Error when trying to " + action + " branch.")
        }
      } catch (err) {
        setError("Error when trying to " + action + " branch.")
      }
    }

    return <>
        <div className="d-flex justify-content-end me-2">
          <div className="text-primary"><Link to="/admin/branch/create"><AiFillPlusCircle /> Create a new branch </Link></div>
          <div> <MdOutlineFindInPage /> <input className="border rounded" name="kw" placeholder="Nhap ten tinh thanh" onChange={(e) => {setKw(e.target.value)}}/></div>
        </div>
        <span className="text-danger">{error}</span>
        <table class="table table-hover table-default">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Province</th>
            <th scope="col">District</th>
            <th scope="col">Ward</th>
            <th scope="col">Quarter</th>
            <th scope="col">House number</th>
            <th scope="col">Function</th>
          </tr>
        </thead>
        <tbody>
          {branches != null && branches.map((branch) => 
            <tr className={!branch.isActive ? "table-active" : ""}>
              <th scope="row">{branch.id}</th>
              <td>{branch.province}</td>
              <td>{branch.district}</td>
              <td>{branch.ward}</td>
              <td>{branch.quarter}</td>
              <td>{branch.houseNumber}</td>
              <td>
                <div>
                  <Link className="text-decoration-none" to={"/admin/branch/view?id=" + branch.id} ><GrFormView /> View</Link>
                  <Link className="text-decoration-none" to={"/admin/branch/edit?id=" + branch.id}><AiFillEdit /> Edit</Link>
                  <Link className="text-decoration-none" to="" onClick={(e) => {deleteBranch(e, branch.id)}}><MdDeleteForever />Delete</Link>
                  <Link className="text-decoration-none" too="" onClick={(e) => {deactivateBranch(e, branch.id, branch.isActive)}} ><BiSolidDish />
                    {branch.isActive ? "Deactivate" : "Activate"}</Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
}

export default Branch;