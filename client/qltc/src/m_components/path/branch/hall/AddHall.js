import { useState } from "react";
import { authApi, endpoints } from "../../../../configs/Apis";

const AddHall = (props) => {
    const branchId = props.branchId

    const addHall = async (e, branchId) => {
        e.preventDefault()
        const form = e.currentTarget;
        var data = {}
        new FormData(form).forEach((value, key) => {
            data[key] = value
        })

        try {
            const api = await authApi().post(endpoints['hall-create'](branchId), [data])
            document.getElementById("addHallEvent").childNodes[0].reset()
            document.getElementById("buttonAddHallEvent").click();
            props.setState({"newHall": "Success adding new hall to this branch",success: true})
        } catch (err) {
            props.setState({"newHall": "Error when creating new branch", success: false})
        }
    }

    const addHallEvent = (e) => {
        let styleOfForm = document.getElementById("addHallEvent").style.display;
        if (styleOfForm == "block") {
            e.target.innerText = "Add new hall"
            document.getElementById("addHallEvent").style.display = "none"
        } else {
            e.target.innerText = "Cancel"
            document.getElementById("addHallEvent").style.display = "block"
        }
    }

    return <>
            <button className="btn btn-secondary mt-1 mb-2" onClick={(e) => {addHallEvent(e)}} id="buttonAddHallEvent">Add new hall</button>
            <span className={props.state.newHall && (props.state.success ? "text-success" : "text-danger")}>{props.state.newHall}</span>
            <div className="border rounded p-2 m-1" id="addHallEvent" style={{display: "none"}}>
                <form onSubmit={(e) => {addHall(e, branchId )}}>
                    <h4>Add new hall</h4>
                    <label for="name" class="form-label">Name</label>
                    <input type="text" id="province" name="name" class="form-control" required/>
                    <label for="description" class="form-label">Description</label>
                    <input type="text" id="description" name="description" class="form-control" required/>
                    <label for="tableCount" class="form-label">Table Count</label>
                    <input type="text" id="tableCount" name="tableCount" class="form-control" required/>
                    <label for="quarter" class="form-label">Guest Up to</label>
                    <input type="text" id="guestUpTo" name="guestUpTo" class="form-control" required/>
                    <label class="form-label">You want to disable this new hall?</label> <br></br>
                    <label class="form-label">Enable</label> <br></br>
                    <input type="radio" id="hall-disable" name="isActive" value={true} required/>
                    <label for="wOnly-Wedding"> Yes </label>
                    <input type="radio" id="hall-disable-false" name="isActive" value={false} required />
                    <label for="branch-disable-false"> No </label><br></br>
                    <button className="btn btn-primary mt-1">Create</button>
                </form>
            </div>
    </>

    
}

export default AddHall;