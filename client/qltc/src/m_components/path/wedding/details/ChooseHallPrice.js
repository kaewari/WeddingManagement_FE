import $ from "jquery"

const ChooseHallPrice = (props) => {

    const selection = props.selection;
    const setSelection = props.setSelection;
    const dataList = props.dataList;
    const hallPrice = props.hallPrice;
    const setHallPrice = props.setHallPrice;

    console.log(hallPrice);

    const addPrice = () => {
        var checked = $("input[type='radio'][name='hall-price']:checked");
        let id = parseInt(checked.val());
        let price = parseInt(checked.attr("price"));
        if (hallPrice.findIndex(p => p.hallPrice == id) < 0)
            setHallPrice([...hallPrice, {hallPrice: id, price: price}]);

    }

    return <>
    <br></br>
    {hallPrice && hallPrice.map((price) => <><p>
        Sanh ID: {price.hallPrice} | Gia: {price.price}
        <button type="button" onClick={() => {setHallPrice(hallPrice.filter(p => p.hallPrice != price.hallPrice))}}
            className="btn btn-danger p-1 m-2">Xoa sanh nay</button></p>
    </>)}

    {selection.branch && dataList.hallList && dataList.hallList.length > 0 ?
        <>
            <br></br>
            <label for={"select-hall"} className="me-2 py-2">Chi nhanh: </label>
            <select id="select-hall" defaultChecked={-1}
                onChange={(e) => {e.target.value > 0 && setSelection({...selection, hall: e.target.value})}}>
                <option key={-1} value={-1}>Chon chi nhanh</option>
                {dataList.hallList && dataList.hallList.map((hall) => <>
                    <option key = {hall.id} value={hall.id}>
                        {hall.name + " "} | TableNumber: { " " + hall.tableCount + " "}
                        |GuestUpTo: { " " + hall.guestUpTo}</option>
                </>)}
            </select><br></br>
        </>
    : <div className="text-secondary py-2">Khong co hall nao ton tai o branh nay</div>}
    {selection.branch && selection.hall ? (dataList.hallPriceList && dataList.hallPriceList.length > 0 ?
    <>
        <fieldset id="select-hallPrice" name="hallPrice">
        <span className="mx-2">Chon thoi diem: </span>
        {selection.hall && dataList.hallPriceList && dataList.hallPriceList.length > 0 && dataList.hallPriceList.map((price) => <>
            <input type="radio" name="hall-price" key={price.id} id={"select-hall-price-" + price.id} defaultChecked={dataList.hallPriceList[0].id == price.id}
            value={price.id} price={price.price} />
            <label for={"select-hall-price-" + price.id} className="m-2 ">{price.period} |Gia: {price.price}</label></>)}
        </fieldset>
    </> 
    : <div className="text-secondary py-2">Khong co price nao ton tai o sanh nay</div>) : <></>}
    <button type="button" className="btn btn-primary" onClick={addPrice}>Them</button>
    </>
}

export default ChooseHallPrice;