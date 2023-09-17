import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../../../configs/Apis";

const ChooseService = (props) => {

    const services = props.services;
    const setServices = props.setServices;
    const [state, setState] = useState(false);
    const [serviceList, setserviceList] = useState([]);
    const [serviceId, setServiceId] = useState([]);


    console.log(serviceId);

    useEffect(() => {
        const api = async () => {
            const response = await authApi().get(endpoints['services']);
            let serviceResponseList = response.data;
            setserviceList(serviceResponseList);
        }
        api();
    }, [state])

    const chooseAction  = (id) => {
        if (serviceId.findIndex(sId => sId == id) > -1) setServiceId(serviceId.filter(sId => sId != id));
        else setServiceId([...serviceId, id]);
    }

    const changeQuantity = (id, value) => {
        // var index = services.findIndex(d => d.serviceId == id);
        // if (services[index].quantity + value > 0) {
        //     services[index].quantity += value;
        //     setState(!state)
        // }
        // else {
        //     setServices(services.filter(d => d.serviceId != id))
        // }
    }

    return <>
        <div className="m-2 border rounded">
            <p className="m-2 fw-bold">Thong tin dich vu cuoi</p>
            <p className="ms-2 m-1"> Vui long chon dich vu muon them</p>
            {serviceList.length > 0 ? <div className="border m-1 p-3 rounded d-flex flex-wrap justify-content-around">
                {serviceList.filter(s => s.isAvailable == true).map((service) => <>
                    <div className={"border col-3 m-1 d-flex flex-wrap justify-content-center rounded hand-pointing"  + (serviceId.filter(sId => sId == service.id).length > 0 ? " border-warning" : "")}>
                        <div onClick={() => {chooseAction(service.id)}} className="p-2">
                            <div className="text-secondary col-12 text-center">{service.name}</div>
                            <div className="text-secondary col-12 text-center">{service.price}</div>
                        </div>
                        {serviceId.length > 0 && services.filter(d => d.serviceId == service.id).length > 0 && services.filter(d => d.serviceId == service.id).map((store) => 
                        <><div className="image-control col-12 d-flex justify-content-center align-items-center m-2">
                            <button type="button" className="m-0 p-1 bg-warning" onClick={() => {changeQuantity(store.serviceId, -1)}}>-</button>
                            <input type="text" className="d-inline-block" style={{width: "25px", height: "25px"}} value={store.quantity} />
                            <button type="button" className="m-0 p-1 bg-warning" onClick={() => {changeQuantity(store.serviceId, 1)}}>+</button>
                        </div></>)}
                    </div>
                </>)}
            </div> : <div className="text-secondary m-2">Khong tim thay dich vu cuoi nao.</div>}
        </div>
    </>

}

export default ChooseService;