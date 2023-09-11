import { useEffect, useState } from "react";
import Apis, { SERVER, authApi, endpoints, authAxiosAPI } from "../../../configs/Apis";
import { useNavigate } from "react-router-dom";

const CreateWeddingService = () => {

    const navigate = useNavigate();
    const [error, setError] = useState();

    const sumbitForm = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        try {
            const data = new FormData(form)
            const response = await authApi().post(endpoints['service-create'], data)
            if (response.status == 201) {
                navigate(-1);
            }
        } catch (err) {
            setError(" Error when trying to adding data to the system.")
        }

    }

    return <>
        <h3>Create a new wedding service</h3>
        <form id="form-dish" onSubmit={(e) => {sumbitForm(e)}}>
            <label for="name" class="form-label">Name</label>
            <input type="text" id="name" name="name" class="form-control" required/> <br></br>
            <label class="form-label">You want to disable this new wedding service?</label> <br></br>
            <label class="form-label">Enable Or Not?</label> <br></br>
            <input type="radio" id="service-disable" name="isAvailable" value={true} checked/>
            <label for="wOnly-Wedding"> Yes </label>
            <input type="radio" id="service-disable-false" name="isAvailable" value={false}  />
            <label for="branch-disable-false"> No </label><br></br>
            <button className="btn btn-primary">Create</button>
            {error}
        </form>
    </>
}

export default CreateWeddingService;