import { useState } from "react";
import { authApi, endpoints } from "../../../../configs/Apis";

const AddHallPrice = (props) => {
    const hallId = props.hallId

    const addHallPrice = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);

        try {
            const api = await authApi().post(endpoints['hall-price-create'](hallId), formData)
            document.getElementById(`${"addHallPriceEvent-" + hallId}`).childNodes[1].reset()
            document.getElementById(`${"buttonAddHallPriceEvent-"+ hallId}`).click();
            props.setState({"newHall": "Success adding new hall to this branch",success: true})
        } catch (err) {
            props.setState({"newHall": "Error when creating new branch", success: false})
        }
    }

    const addHallEvent = (e) => {
        let styleOfForm = document.getElementById(`${"addHallPriceEvent-" + hallId}`).style.display;
        if (styleOfForm == "block") {
            e.target.innerText = "Add new price"
            document.getElementById(`${"addHallPriceEvent-" + hallId}`).style.display = "none"
        } else {
            e.target.innerText = "Cancel"
            document.getElementById(`${"addHallPriceEvent-" + hallId}`).style.display = "block"
        }
    }

    return <>
            <button className="btn btn-secondary" onClick={(e) => {addHallEvent(e)}} id={"buttonAddHallPriceEvent-"+ hallId}>Add new price</button>
            <span className={props.state.newHall && (props.state.success ? "text-success" : "text-danger")}>{props.state.newHall}</span>
            <div className="border rounded p-2 m-1" id={"addHallPriceEvent-" + hallId} style={{display: "none"}}>
                <h4>Add new price</h4>
                <form id="formAddHallPrice" onSubmit={(e) => { addHallPrice(e) }}>
                    <label for="period" class="form-label">Period</label>
                    <input type="text" id="period" name="period" class="form-control" required/>
                    <label for="price" class="form-label">Price</label>
                    <input type="text" id="price" name="price" class="form-control" required/>
                    <label for="discount" class="form-label">Discount</label>
                    <input type="text" id="discount" name="discount" class="form-control" required/>
                    <button className="btn btn-primary mt-2">Create</button>
                </form>
            </div>
    </>

    
}

export default AddHallPrice;