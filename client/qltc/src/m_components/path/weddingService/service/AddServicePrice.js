import { useState } from "react";
import { authApi, endpoints } from "../../../../configs/Apis";

const AddServicePrice = (props) => {
    const serviceId = props.serviceId

    const addServicePrice = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

        try {
            const api = await authApi().post(endpoints['service-price-create'](serviceId), [data])
            document.getElementById(`${"addServicePriceEvent-" + serviceId}`).childNodes[1].reset()
            document.getElementById(`${"buttonAddServicePriceEvent-"+ serviceId}`).click();
            props.setState({"newService": "Success adding new service to this branch",success: true})
        } catch (err) {
            props.setState({"newService": "Error when creating new branch", success: false})
        }
    }

    const addServiceEvent = (e) => {
        let styleOfForm = document.getElementById(`${"addServicePriceEvent-" + serviceId}`).style.display;
        if (styleOfForm == "block") {
            e.target.innerText = "Add new price"
            document.getElementById(`${"addServicePriceEvent-" + serviceId}`).style.display = "none"
        } else {
            e.target.innerText = "Cancel"
            document.getElementById(`${"addServicePriceEvent-" + serviceId}`).style.display = "block"
        }
    }

    return <>
            <button className="btn btn-secondary" onClick={(e) => {addServiceEvent(e)}} id={"buttonAddServicePriceEvent-"+ serviceId}>Add new price</button>
            <span className={props.state.newService && (props.state.success ? "text-success" : "text-danger")}>{props.state.newService}</span>
            <div className="border rounded p-2 m-1" id={"addServicePriceEvent-" + serviceId} style={{display: "none"}}>
                <h4>Add new price</h4>
                <form id="formAddServicePrice" onSubmit={(e) => { addServicePrice(e) }}>
                    <label for="period" class="form-label">Period</label>
                    <input type="text" id="period" name="period" class="form-control" required/>
                    <label for="price" class="form-label">Price</label>
                    <input type="text" id="price" name="price" class="form-control" required/>
                    <label class="form-label mt-2">You want to disable this service?</label> <br></br>
                    <label class="form-label">Enable</label> <br></br>
                    <input type="radio" id="service-disable" name="isActive" value={true} required/>
                    <label for="wOnly-Wedding"> Yes </label>
                    <input type="radio" id="service-disable-false" name="isActive" value={false} required />
                    <label for="service-disable-false"> No </label><br></br>
                    <button className="btn btn-primary mt-2">Create</button>
                </form>
            </div>
    </>

    
}

export default AddServicePrice;