import { useEffect, useState } from "react";
import Apis, {
  SERVER,
  authApi,
  endpoints,
  authAxiosAPI,
} from "../../../configs/Apis";
import { useNavigate } from "react-router-dom";

const CreateDish = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const sumbitForm = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      const data = new FormData(form);
      const response = await authApi().post(endpoints["dish-create"], data);
      if (response.status == 201) {
        navigate(-1);
      }
    } catch (err) {
      setError(" Error when trying to adding data to the system.");
    }
  };

  return (
    <>
      <h3>Create a new dish</h3>
      <form
        id="form-dish"
        onSubmit={(e) => {
          sumbitForm(e);
        }}
      >
        <label for="name" class="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          class="form-control"
          required
        />
        <label for="price" class="form-label">
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          class="form-control"
          required
        />
        <label for="discount" class="form-label">
          Discount
        </label>
        <input
          type="text"
          id="discount"
          name="discount"
          class="form-control"
          required
        />
        <label for="unit" class="form-label">
          Unit
        </label>
        <input
          type="text"
          id="unit"
          name="unit"
          class="form-control"
          required
        />
        <label for="type" class="form-label">
          Type
        </label>
        <input
          type="text"
          id="type"
          name="type"
          class="form-control"
          required
        />
        <label for="file" class="form-label">
          Dish image
        </label>
        <input
          type="file"
          id="file"
          name="file"
          class="form-control"
          required
        />
        <label class="form-label">Weding Only</label> <br></br>
        <input type="radio" id="wOnly-Wedding" name="wOnly" value={true} />
        <label for="wOnly-Wedding"> Yes </label>
        <input
          type="radio"
          id="wOnly-NotWedding"
          name="wOnly"
          value={false}
          checked
        />
        <label for="wOnly-NotWedding"> No </label>
        <br></br>
        <button className="btn btn-primary">Create</button>
        {error}
      </form>
    </>
  );
};

export default CreateDish;
