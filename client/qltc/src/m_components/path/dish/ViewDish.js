import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { endpoints } from "../../../configs/Apis";

const ViewDish = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [dish, setDish] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    try {
      let response = axios.get(endpoints["dish-details"](id));
      response.then((response) => {
        if (response.status == 200) {
          setDish(response.data);
        } else if (response.status == 404) {
          setError("Not found this dish in the system");
        } else {
          throw new Error();
        }
      });
    } catch (err) {
      setError("Error taking data from the system.");
    }
  }, []);

  return (
    <>
      <h2>Dish details id: {id} </h2>
      <Link to={"/admin/dish/edit?id=" + id} className="btn btn-secondary">
        You need to update?
      </Link>
      <p className="text-red">{error}</p>
      {dish != null && (
        <div className="container">
          <p>
            Name: <span className="fw-bold">{dish.name}</span>
          </p>
          <p>
            Price: <span className="fw-bold">{dish.price}</span>
          </p>
          <p>
            Discount: <span className="fw-bold">{dish.discount}</span>
          </p>
          <p>
            Unit: <span className="fw-bold">{dish.unit}</span>
          </p>
          <p>
            Type: <span className="fw-bold">{dish.type}</span>
          </p>
          <span>Dish Image:</span> <img src={dish.image} alt="dish_picture" />
          <p>
            Wedding Only:{" "}
            <span className="fw-bold">{dish.wOnly ? "Yes" : "No"}</span>
          </p>
          <p>
            Is Available:{" "}
            <span className="fw-bold">{dish.isAvailable ? "Yes" : "No"}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default ViewDish;
