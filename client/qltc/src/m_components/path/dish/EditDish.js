import { useEffect, useState } from "react";
import Apis, { SERVER, authApi, endpoints, authAxiosAPI } from "../../../configs/Apis";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const EditDish = () => {

    const [params] = useSearchParams();
    const id = params.get("id");
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [dish, setDish] = useState();

    useEffect(() => {
        try {
            let response = axios.get(endpoints['dish-details'](id), {baseURL: SERVER})
            response.then((response) => {
                if (response.status == 200) {
                    setDish(response.data)
                }
                else if (response.status == 404) {
                    setError("Not found this dish in the system")
                } else {
                    throw new Error()
                }
            })
            
        } catch (err) {
            setError("Error taking data from the system.")
        }
    }, [])

    const sumbitForm = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        try {
            const data = new FormData(form);
            const response = await authApi().post(endpoints['dish-edit'](id), data)
            if (response.status == 202) {
                navigate(-1);
            }
        } catch (err) {
            setError(" Error when trying to updating data to the system.")
        }

    }

    return <>
        <h3>Update a dish id: {id}</h3>
        {dish == null && error}
        {dish && <form id="form-dish" onSubmit={(e) => {sumbitForm(e)}}>
            <label for="name" className="form-label">Name</label>
            <input type="text" id="name" name="name" class="form-control"  defaultValue={dish.name}/>
            <label for="price" className="form-label">Price</label>
            <input type="text" id="price" name="price" class="form-control" defaultValue={dish.price}/>
            <label for="discount" className="form-label">Discount</label>
            <input type="text" id="discount" name="discount" class="form-control" defaultValue={dish.discount}/>
            <label for="unit" className="form-label">Unit</label>
            <input type="text" id="unit" name="unit" class="form-control" defaultValue={dish.unit}/>
            <label for="type" className="form-label">Type</label>
            <input type="text" id="type" name="type" class="form-control" defaultValue={dish.type}/>
            <label className="form-label">Weding Only</label> <br></br>
            <input type="radio" id="wOnly-Wedding" name="wOnly" value={true} defaultChecked={dish.wonly}/>
            <label for="wOnly-Wedding"> Yes </label>
            <input type="radio" id="wOnly-NotWedding" name="wOnly" value={false} defaultChecked={!dish.wonly} />
            <label for="wOnly-NotWedding"> No </label><br></br>
            <label for="file" className="form-label">Dish image</label>
            <input type="file" id="file" name="file" className="form-control"/>
            <label>Current image</label>
            <img src={dish.image} alt={dish.name + ".jpg"} className="d-block"/>
            <button className="btn btn-primary">Update</button>
            {error}
        </form>}
    </>
}

export default EditDish;