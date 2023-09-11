import { authApi, endpoints } from "../../../../configs/Apis";
import cookie from "react-cookies"

const UpdateServicePrice = (props) => {

    const service = props.service;
    const setState = props.setState
    const state = props.state
    const servicePrice = props.servicePrice;
    const setServicePrice = props.setServicePrice;

    const updateServicePrice = async (e, id) => {
        e.preventDefault();
        const form = e.currentTarget
        const data = {}
        new FormData(form).forEach((value, key) => {
            data[key] = value;
        })

        try {
            const api = await authApi().put(endpoints['service-price-update'](id), data)
            setState({"servicePriceUpdate": "Update successfully", success: true, serviceId: service.id})
        } catch (err) {
            setState({"servicePriceUpdate": "Failed to update.", success: false, serviceId: service.id})
        }
    }
    const removeServicePrice = async (e, id) => {
        e.preventDefault()
        
        try {
            const api = await authApi().delete(endpoints['service-price-delete'](id), {method: "DELETE", headers: {"Authorization": cookie.load("token").access_token}})
            setState({"servicePriceDelete": "Delete successfully", success: true, serviceId: service.id})
        } catch (err) {
            setState({"servicePriceDelete": "Failed to delete.", success: false, serviceId: service.id})
        }
    }

    return <>
         {service && service.prices.length > 0 ? <>
            <label for={"servicePriceChoose-HalId-" +  service.id}>Choose price to modify: </label>
            <select name={"servicePriceChoose-HalId-" +  service.id} className="mb-3 ms-2" defaultValue={servicePrice ? servicePrice : -1} onChange={(e) => {setServicePrice(e.target.value)}}>
                <option value={-1}>Choose one</option> 
            {service.prices && service.prices.map((price) => { 
                return <option value={price.id}>{price.period}</option>
            })}
            </select><br></br></> :
            <p className="text-secondary">No any prices now.</p>}
            {state.servicePriceUpdate && state.serviceId == service.id &&
                <> <span className={state.success ? "text-success" : "text-danger"}>{state.servicePriceUpdate}</span><br></br></>}
            {state.servicePriceDelete && state.serviceId == service.id &&
                <> <span className={state.success ? "text-success" : "text-danger"}>{state.servicePriceDelete}</span><br></br></>}
            {servicePrice && service.prices.filter(p => p.id == servicePrice).map((price) => {
                return <div className="m-2 p-2">
                    <form onSubmit={(e) => {updateServicePrice(e, price.id)}}>
                        <input hidden defaultValue={price.id} />
                        <label for="period" class="form-label">Period</label>
                        <input type="text" id="period" name="period" class="form-control" defaultValue={price.period}/>
                        <label for="price" class="form-label">Price</label>
                        <input type="text" id="price" name="price" class="form-control" defaultValue={price.price}/>
                        <label class="form-label mt-2">You want to disable this service?</label> <br></br>
                        <label class="form-label">Enable</label> <br></br>
                        <input type="radio" id="service-disable" name="isActive" value={true} defaultChecked={price.isAvailable}/>
                        <label for="wOnly-Wedding"> Yes </label>
                        <input type="radio" id="service-disable-false" name="isActive" value={false} defaultChecked={!price.isAvailable} />
                        <label for="service-disable-false"> No </label><br></br>
                        <button type="submit" className="btn btn-primary mt-3">Update this price</button>
                        <button onClick={(e) => {removeServicePrice(e, price.id)}} className="btn btn-danger mt-3 ms-2">Delete this price</button>
                        <button onClick={(e) => { e.preventDefault(); setServicePrice(-1)}} className="btn btn-secondary mt-3 ms-2">Close</button>
                    </form>
                </div>
            })}
    </>

}

export default UpdateServicePrice;