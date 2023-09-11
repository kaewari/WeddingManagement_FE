import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SERVER, endpoints } from "../../../configs/Apis";

const ViewWeddingService = () => {

    const [service, setService] = useState();
    const [params] = useSearchParams();
    const id = params.get("id")
    const [error, setError] = useState()

    useEffect(() => {
        try {
            const api = async () => {
                let response = await axios.get(endpoints['service-details'](id), {baseURL: SERVER})
                setService(response.data)
            }
            api();
        } catch (err) {
            setError("error when fetching data from system.")
        }
    }, []);

    return <>
        <h2>View Wedding Service id: {id}</h2>
        <div className="border rounded p-2">
            <h3>Thong tin wedding service</h3>
            <p className="text-danger">{error}</p>
            {service != null && <>
                <p>Name: <span className="fw-bold">{service.name}</span></p>
                <p>Available: <span className="fw-bold">{service.isAvailable ? "Available" : "Unavailable"}</span></p>
                <p>User has created this: <span className="fw-bold">{service.whatUser.name}, User ID: {service.whatUser.id}</span></p></>
            }
        </div>
        <div className="border rounded p-2 mt-3">
            <h3>Thong tin price</h3>
            <p className="text-danger">{error}</p>
            {service != null && service.prices.length > 0 ? service.prices.map((price) => <div className="m-1 p-2 border rounded">
                <h4>Price id: <span className="fw-bold">{price.id}</span></h4>
                <p>Period: <span className="fw-bold">{price.period}</span></p>
                <p>Price: <span className="fw-bold">{price.price}</span></p>
                <p>Available: <span className="fw-bold">{price.isAvailable ? "Yes" : "No"}</span></p>
                </div>) : <span className="text-secondary">No any prices in this service.</span>}
        </div>
    </>

}

export default ViewWeddingService;