import { authApi, endpoints } from "../../../../configs/Apis";
import cookie from "react-cookies";

const UpdateHallPrice = (props) => {
  const hall = props.hall;
  const setState = props.setState;
  const state = props.state;
  const hallPrice = props.hallPrice;
  const setHallPrice = props.setHallPrice;

  const addHallPrice = async () => {};
  const updateHallPrice = async (e, id) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const api = await authApi().post(
        endpoints["hall-price-update"](id),
        data
      );
      setState({
        hallPriceUpdate: "Update successfully",
        success: true,
        hallId: hall.id,
      });
    } catch (err) {
      setState({
        hallPriceUpdate: "Failed to update.",
        success: false,
        hallId: hall.id,
      });
    }
  };
  const removeHallPrice = async (e, id) => {
    e.preventDefault();

    try {
      const api = await authApi().delete(endpoints["hall-price-delete"](id), {
        method: "DELETE",
        headers: { Authorization: cookie.load("token").access_token },
      });
      setState({
        hallPriceDelete: "Delete successfully",
        success: true,
        hallId: hall.id,
      });
    } catch (err) {
      setState({
        hallPriceDelete: "Failed to delete.",
        success: false,
        hallId: hall.id,
      });
    }
  };

  return (
    <>
      {hall.prices.length > 0 ? (
        <>
          <label for={"hallPriceChoose-HalId-" + hall.id}>
            Choose price to modify:{" "}
          </label>
          <select
            name={"hallPriceChoose-HalId-" + hall.id}
            className="mb-3 ms-2"
            defaultValue={hallPrice ? hallPrice : -1}
            onChange={(e) => {
              setHallPrice(e.target.value);
            }}
          >
            <option value={-1}>Choose one</option>
            {hall.prices &&
              hall.prices.map((price) => {
                return <option value={price.id}>{price.period}</option>;
              })}
          </select>
          <br></br>
        </>
      ) : (
        <p className="text-secondary">No any prices now.</p>
      )}
      {state.hallPriceUpdate && state.hallId == hall.id && (
        <>
          {" "}
          <span className={state.success ? "text-success" : "text-danger"}>
            {state.hallPriceUpdate}
          </span>
          <br></br>
        </>
      )}
      {state.hallPriceDelete && state.hallId == hall.id && (
        <>
          {" "}
          <span className={state.success ? "text-success" : "text-danger"}>
            {state.hallPriceDelete}
          </span>
          <br></br>
        </>
      )}
      {hallPrice &&
        hall.prices
          .filter((p) => p.id == hallPrice)
          .map((price) => {
            return (
              <div className="m-2 p-2">
                <form
                  onSubmit={(e) => {
                    updateHallPrice(e, price.id);
                  }}
                >
                  <input hidden defaultValue={price.id} />
                  <label for="period" class="form-label">
                    Period
                  </label>
                  <input
                    type="text"
                    id="period"
                    name="period"
                    class="form-control"
                    defaultValue={price.period}
                  />
                  <label for="price" class="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    class="form-control"
                    defaultValue={price.price}
                  />
                  <label for="discount" class="form-label">
                    Discount
                  </label>
                  <input
                    type="text"
                    id="discount"
                    name="discount"
                    class="form-control"
                    defaultValue={price.discount}
                  />
                  <button type="submit" className="btn btn-primary mt-3">
                    Update this price
                  </button>
                  <button
                    onClick={(e) => {
                      removeHallPrice(e, price.id);
                    }}
                    className="btn btn-danger mt-3 ms-2"
                  >
                    Delete this price
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setHallPrice(-1);
                    }}
                    className="btn btn-secondary mt-3 ms-2"
                  >
                    Close
                  </button>
                </form>
              </div>
            );
          })}
    </>
  );
};

export default UpdateHallPrice;
