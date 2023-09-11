import axios from "axios";
import { useEffect, useState } from "react";
import cookie from "react-cookies";
import { useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import AddHall from "./hall/AddHall";
import AddHallPrice from "./hall/AddHallPrice";
import UpdateHallPrice from "./hall/UpdateHallPrice";

const EditBranch = () => {
    const [branch, setBranch] = useState()
    const [params] = useSearchParams();
    const branchId = params.get("id")
    const [error, setError] = useState({})
    const [state, setState] = useState({})
    const [hallPrice, setHallPrice] = useState()

    useEffect(() => {
        try {
            const api = async () => {
                let response = await axios.get(endpoints['branch-details'](branchId))
                setBranch(response.data)
            }
            api();
        } catch (err) {
            setError({"branch": "error when fetching data from system."})
        }
    }, [error, state, hallPrice])

    const updateBranchInfo = async (e, id) => {
        e.preventDefault();
        const form = e.currentTarget;
        var data = {}
        new FormData(form).forEach((value, key) => {
            data[key] = value;
        })
        
        try {
            const api = await authApi().put(endpoints['branch-edit'](id), data) 
            setState({"branch": "Success Update.", "success": true})
        } catch(err) {
            setState({"branch": "Error when updating branch.", "success": false})
        }
    }

    const updateHall = async (e, id) => {
        e.preventDefault();
        const form = e.currentTarget;
        var data = {}
        new FormData(form).forEach((value, key) => {
            data[key] = value;
        })
        
        try {
            const api = await authApi().put(endpoints['hall-update'](id), data)
            setState({"hall": "Success Update.", "success": true, "hallId": id})
        } catch(err) {
            setState({"hall": "Error when updating hall.", "success": false, "hallId": id})
        }
    }
    const removeHall = async (e, id, hallName) => {
        e.preventDefault()
        try {
            const api = await authApi().delete(endpoints['hall-delete'](id), {method: "DELETE", headers: {"Authorization": cookie.load("token").access_token}})
            setState({"deleteHall": "Delete hall \"" + hallName + "\" successfully.", success: true})
        } catch (err) {
            setState({"deleteHall": "Delete hall \"" + hallName + "\" is denied..", success: false})
        }
    }
    const deactivateHall = async (e, id, isActive) => {
        e.preventDefault()
        const action = isActive ? "deactivate" : "activate";
        try {
            const api = await authApi().post(isActive ? endpoints['hall-deactivate'](id) : endpoints['hall-activate'](id))
            setState({"hallDeactivate": action + " successfull", success: true, hallId: id})
        } catch (err) {
            setState({"hallDeactivate": "Failed to " + action, success: false, hallId: id})
        }
    }


    return <>   
        <form className="border m-1 p-2 rounded" onSubmit={(e) => updateBranchInfo(e, branchId)}>
            <h3 className="text-decoration-underline">Thong tin branch</h3>
            <span className="text-danger">{error.branch}</span>
            <span class={state.success ? "text-success" : "text-danger"}>{state.deleteHall}</span>
            {branch && <><p>Branch id: <span className="fw-bold">{branch.id}</span></p>
            <input name="id" hidden defaultValue={branchId} />
            <label for="province" class="form-label">Province</label>
            <input type="text" id="province" name="province" class="form-control" defaultValue={branch.province}/>
            <label for="district" class="form-label">District</label>
            <input type="text" id="district" name="district" class="form-control" defaultValue={branch.district}/>
            <label for="ward" class="form-label">Ward</label>
            <input type="text" id="ward" name="ward" class="form-control" defaultValue={branch.ward}/>
            <label for="quarter" class="form-label">Quarter</label>
            <input type="text" id="quarter" name="quarter" class="form-control" defaultValue={branch.quarter}/>
            <label for="houseNumber" class="form-label">House Number</label>
            <input type="text" id="houseNumber" name="houseNumber" class="form-control" defaultValue={branch.houseNumber}/>
            <label class="form-label">You want to disable this branch?</label> <br></br>
            <label class="form-label">Enable</label> <br></br>
            <input type="radio" id="branch-disable" name="isActive" value={true} defaultChecked={branch.isActive}/>
            <label for="wOnly-Wedding"> Yes </label>
            <input type="radio" id="branch-disable-false" name="isActive" value={false} defaultChecked={!branch.isActive} />
            <label for="branch-disable-false"> No </label><br></br>
            <button className="btn btn-primary">Update branch information</button> 
            <span class={state.success ? "text-success" : "text-danger"}>{state.branch}</span>
            </>}
        </form>
        <div class="m-1 p-2 rounded border">
            <h3 className="text-decoration-underline">Danh sach cac hall trong branch</h3>
            <AddHall branchId={branchId} setState={setState} state={state}/>
            {branch && branch.halls && branch.halls.map((hall) => { return <>
                <div className="border rounded p-2 m-1">
                <form onSubmit={(e) => {updateHall(e, hall.id)}}>
                    <div className="d-flex justify-content-between">
                        <h4 className="d-inline-block">{hall.name}</h4>
                        <div>
                            <button onClick={(e) => {deactivateHall(e, hall.id, hall.isActive)}}
                                className={"btn " + (hall.isActive ? "btn-warning" : "btn-success")}>{hall.isActive ? "Deactivate" : "Activate"}</button>
                            <button onClick={(e) => {removeHall(e, hall.id, hall.name)}} className="btn btn-danger mx-2">Delete</button>
                        </div>
                    </div>
                    <input name="id" hidden defaultValue={hall.id} />
                    <label for="name" class="form-label">Name</label>
                    <input type="text" id="province" name="name" class="form-control" defaultValue={hall.name}/>
                    <label for="description" class="form-label">Description</label>
                    <input type="text" id="description" name="description" class="form-control" defaultValue={hall.description}/>
                    <label for="tableCount" class="form-label">Table Count</label>
                    <input type="text" id="tableCount" name="tableCount" class="form-control" defaultValue={hall.tableCount}/>
                    <label for="quarter" class="form-label">Guest Up to</label>
                    <input type="text" id="guestUpTo" name="guestUpTo" class="form-control" defaultValue={hall.guestUpTo}/>
                    <label class="form-label">You want to disable this hall?</label> <br></br>
                    <label class="form-label">Enable</label> <br></br>
                    <input type="radio" id="hall-disable" name="isActive" value={true} defaultChecked={hall.isActive}/>
                    <label for="wOnly-Wedding"> Yes </label>
                    <input type="radio" id="hall-disable-false" name="isActive" value={false} defaultChecked={!hall.isActive} />
                    <label for="branch-disable-false"> No </label><br></br>
                    <button className="btn btn-primary">Update this hall</button>
                    <span class={state.success ? "text-success" : "text-danger"}>{state.hall && state.hallId == hall.id && state.hall}</span>
                    {state.hallId == hall.id && <span class={state.success ? "text-success" : "text-danger"}>{state.hallDeactivate}</span>}
                </form>

                {/* <div className="my-3 mx-2">
                    {hall.prices.length > 0 ? <>
                    <label for={"hallPriceChoose-HalId-" +  hall.id}>Choose price to update: </label>
                    <select name={"hallPriceChoose-HalId-" +  hall.id} className="mb-3" defaultValue={-1} onChange={(e) => setHallPrice(e.target.value)}>
                        <option value={-1}>Choose one</option> 
                    {hall.prices && hall.prices.map((price) => { 
                        return <option value={price.id}>{price.period}</option>
                    })}
                    </select><br></br></> :
                    <p className="text-secondary">No any prices now.</p>}
                    {hallPrice && hall.prices.filter(p => p.id == hallPrice).map((price) => {
                        return <div className="m-2 p-2">
                            <form onSubmit={(e) => {updateHallPrice(e, price.id)}}>
                                
                            </form>
                        </div>
                    })}
                    <AddHallPrice state={state} setState={setState} hallId={hall.id} /> 
                </div> */}
                <div className="my-3 mx-2">
                    <UpdateHallPrice state={state} setState={setState} hall={hall} hallPrice={hallPrice} setHallPrice={setHallPrice}  />
                    <AddHallPrice state={state} setState={setState} hallId={hall.id} /> 
                </div>
                </div></>
                
            })}
        </div>
    </>
}

export default EditBranch;