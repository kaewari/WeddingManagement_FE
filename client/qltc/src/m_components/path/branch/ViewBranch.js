import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { endpoints } from "../../../configs/Apis";

const ViewBranch = () => {

    const [branch, setBranch] = useState();
    const [params] = useSearchParams();
    const id = params.get("id")
    const [error, setError] = useState()

    useEffect(() => {
        try {
            const api = async () => {
                let response = await axios.get(endpoints['branch-details'](id))
                setBranch(response.data)
            }
            api();
        } catch (err) {
            setError("error when fetching data from system.")
        }
    }, []);

    return <>
        <h2>View Branch id: {id}</h2>
        <div className="border rounded p-2">
            <h3>Thong tin branch</h3>
            <p className="text-danger">{error}</p>
            {branch != null && <>
                <p>Province: <span className="fw-bold">{branch.province}</span></p>
                <p>District: <span className="fw-bold">{branch.district}</span></p>
                <p>Ward: <span className="fw-bold">{branch.ward}</span></p>
                <p>Quarter: <span className="fw-bold">{branch.quarter}</span></p>
                <p>House Number: <span className="fw-bold">{branch.houseNumber}</span></p>
                <p>Is Active: <span className="fw-bold">{branch.isActive ? "Yes" : "No"}</span></p></>
            }
        </div>
        <div className="border rounded p-2 mt-3">
            <h3>Thong tin hall</h3>
            <p className="text-danger">{error}</p>
            {branch != null && branch.halls != null && branch.halls.map((hall) => <div className={"m-1 p-2 border rounded " + (!hall.isActive ? "bg-secondary" : "")}>
                <h4>Hall id: <span className="fw-bold">{hall.id}</span></h4>
                <p>Name: <span className="fw-bold">{hall.name}</span></p>
                <p>Description: <span className="fw-bold">{hall.description}</span></p>
                <p>Table count: <span className="fw-bold">{hall.tableCount}</span></p>
                <p>Guest Up to: <span className="fw-bold">{hall.guestUpTo}</span></p>
                <p>Created Date: <span className="fw-bold">{new Date(hall.createdDate).toLocaleString("en-GB")}</span></p>
                <p>Is Active: <span className="fw-bold">{branch.isActive ? "Yes" : "No"}</span></p>
                    {hall.prices.length > 0 ? hall.prices.map((price) => <div className="border rounded m-2 p-2">
                        <h5>Hall Price id: {price.id}</h5>
                        <p>Peiod: <span className="fw-bold">{price.period}</span></p>
                        <p>Price: <span className="fw-bold">{price.price}</span></p>
                        <p>Discount: <span className="fw-bold">{price.discount}</span></p>
                    </div>
                    ) : <span className="text-secondary">No any hall price at the moment.</span>}
                </div>
            )}
        </div>
    </>

}

export default ViewBranch;