import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../../../configs/Apis";

const ChooseDish = (props) => {
  const dishes = props.dishes;
  const setDishes = props.setDishes;
  const [state, setState] = useState(false);
  const [dishList, setDishList] = useState([]);

  useEffect(() => {
    let api = async (pageSize, pageIndex) => {
      let { data } = await authApi().get(
        endpoints["dishes"] +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      );
      setDishList(data);
    };
    api(100, 1);
  }, [state]);

  const chooseAction = (dishId, price, discount) => {
    if (dishes.findIndex((d) => d.dish == dishId) > -1)
      setDishes(dishes.filter((d) => d.dish != dishId));
    else
      setDishes([
        ...dishes,
        {
          dish: dishId,
          quantity: 1,
          price: price,
          note: "Khong",
          discount: discount,
        },
      ]);
  };

  const changeQuantity = (id, value) => {
    var index = dishes.findIndex((d) => d.dish == id);
    if (dishes[index].quantity + value > 0) {
      dishes[index].quantity += value;
      setState(!state);
    } else {
      setDishes(dishes.filter((d) => d.dish != id));
    }
  };

  return (
    <>
      <div className="m-2 border rounded">
        <p className="m-2 fw-bold">Thong tin mon an</p>
        <p className="ms-2 m-1"> Chon mon </p>
        {dishList.length > 0 ? (
          <div className="border m-1 p-3 rounded d-flex flex-wrap justify-content-around">
            {dishList.map((dish) => (
              <>
                <div
                  className={
                    "border col-3 m-1 d-flex flex-wrap justify-content-center rounded hand-pointing" +
                    (dishes.filter((d) => d.dish === dish.id).length > 0
                      ? " border-warning"
                      : "")
                  }
                >
                  <div
                    onClick={() => {
                      chooseAction(dish.id, dish.price, dish.discount);
                    }}
                  >
                    <div className="p-2">
                      <img
                        src={dish.image}
                        alt={"pic" + dish.name}
                        className="col-12"
                        width="128px"
                        height="128px"
                      />
                    </div>
                    <div className="text-secondary col-12 text-center">
                      {dish.name}
                    </div>
                    {dish.discount > 0 && (
                      <div className="text-secondary col-12 text-center">
                        <del>{dish.price}</del>
                      </div>
                    )}
                    <div className="text-secondary col-12 text-center">
                      {(dish.price * (100 - dish.discount)) / 100}
                    </div>
                  </div>
                  {dishes.filter((d) => d.dish === dish.id).length > 0 &&
                    dishes
                      .filter((d) => d.dish === dish.id)
                      .map((store) => (
                        <>
                          <div className="image-control col-12 d-flex justify-content-center align-items-center m-2">
                            <button
                              type="button"
                              className="m-0 p-1 bg-warning"
                              onClick={() => {
                                changeQuantity(store.dish, -1);
                              }}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="d-inline-block"
                              style={{ width: "25px", height: "25px" }}
                              value={store.quantity}
                            />
                            <button
                              type="button"
                              className="m-0 p-1 bg-warning"
                              onClick={() => {
                                changeQuantity(store.dish, 1);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </>
                      ))}
                </div>
              </>
            ))}
          </div>
        ) : (
          <div className="text-secondary m-2">Khong tim thay mon an nao.</div>
        )}
      </div>
    </>
  );
};

export default ChooseDish;
