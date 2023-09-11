import { useEffect, useState } from "react";
import Apis, { SERVER, authApi, endpoints, authAxiosAPI } from "../../../configs/Apis";
import { useNavigate } from "react-router-dom";

const CreateDish = () => {

    const navigate = useNavigate();
    const [error, setError] = useState();

    const sumbitForm = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        var data = {};
        new FormData(form).forEach(function(value, key){
            data[key] = value;
        });

        try {
            const response = await authApi().post(endpoints['branch-create'], data)
            if (response.status == 201) {
                navigate(-1);
            }
        } catch (err) {
            setError(" Error when trying to adding data to the system.")
        }

    }

    return <>
        <h3>Create a new branch</h3>
        <form id="form-dish" onSubmit={(e) => {sumbitForm(e)}}>
            <label for="province" class="form-label">Province</label>
            <input type="text" id="province" name="province" class="form-control" required/>
            <label for="district" class="form-label">District</label>
            <input type="text" id="district" name="district" class="form-control" required/>
            <label for="ward" class="form-label">Ward</label>
            <input type="text" id="ward" name="ward" class="form-control" required/>
            <label for="quarter" class="form-label">Quarter</label>
            <input type="text" id="quarter" name="quarter" class="form-control" required/>
            <label for="houseNumber" class="form-label">House Number</label>
            <input type="text" id="houseNumber" name="houseNumber" class="form-control" required/>
            <label class="form-label">You want to disable this new branch?</label> <br></br>
            <input type="radio" id="branch-disable" name="isActive" value={true} checked/>
            <label for="wOnly-Wedding"> Yes </label>
            <input type="radio" id="branch-disable-false" name="isActive" value={false}  />
            <label for="branch-disable-false"> No </label><br></br>
            <button className="btn btn-primary">Create</button>
            {error}
        </form>
    </>
}

export default CreateDish;