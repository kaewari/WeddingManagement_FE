import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SERVER, authApi, endpoints } from "../../../configs/Apis";
import AddServicePrice from "./service/AddServicePrice";
import UpdateServicePrice from "./service/UpdateServicePrice";

const EditWeddingService = () => {

    const [service, setService] = useState()
    const[state, setState] = useState({})
    const[params] = useSearchParams()
    const serviceId = params.get('id')
    const [error, setError] = useState({})
    const [servicePrice, setServicePrice] = useState()
    
    useEffect(() => {
        try {
            const api = async () => {
                let response = await axios.get(endpoints['service-details'](serviceId), {baseURL: SERVER})
                setService(response.data)
            }
            api();
        } catch (err) {
            setError({"weddingService": "Not found."})
        }
    }, [state, servicePrice])

    const updateWeddingService = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        var data = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

        try {
            const api = await authApi().put(endpoints['service-update'](serviceId), data)
            setState({"updateService": "Update service successfully", success : true})
        } catch (err) {
            setState({"updateService": "Update service failed", success : false})
        }
    }

    return <>
        <div className="border rounded m-1 p-2">
            <h3>Thong tin Wedding service</h3>
            <p className="text-danger">{error.weddingService}</p>
            {service && <div>
                <form onSubmit={(e) => {updateWeddingService(e)}}>
                    <input name="id" hidden defaultValue={serviceId} />
                    <label for="name" class="form-label">Name</label>
                    <input type="text" id="name" name="name" class="form-control" defaultValue={service.name}/>
                    <label class="form-label my-2">You want to disable this branch?</label> <br></br>
                    <label class="form-label">Enable</label> <br></br>
                    <input type="radio" id="service-disable" name="isActive" value={true} defaultChecked={service.isAvailable}/>
                    <label for="service-disable"> Yes </label>
                    <input type="radio" id="service-disable-false" name="isActive" value={false} defaultChecked={!service.isAvailable} />
                    <label for="service-disable-false"> No </label><br></br>
                    <button className="btn btn-primary my-2">Update wedding service information</button> 
                    <span class={state.success ? "text-success" : "text-danger"}>{state.updateService}</span>  
                </form>
            </div>}
            <div>
                <UpdateServicePrice service={service} state={state} setState={setState} servicePrice={servicePrice} setServicePrice={setServicePrice} />
                <AddServicePrice serviceId={serviceId} state={state} setState={setState} />
            </div>
        </div>
    </> 
}

export default EditWeddingService;