import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../App";
import { authApi, endpoints } from "../configs/Apis";

const UserCreateFeedback = () => {
    
    const [user, dispatch] = useContext(MyUserContext)
    const [state, setState] = useState({})

    const submitFeedback = async (e, userId) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        var data = {}
        form.forEach((value, key) => {
            data[key] = value
        })
        try {
            const api = await authApi().post(endpoints['feedback-create'], data)
            setState({"message": "Cảm ơn bạn đã phản hồi. Chúng tôi rất cảm ơn những lời góp ý của quý khách hàng.", success: true})
        } catch (err) {
            setState({"message": "Ôi lỗi rồi. Bạn kiểm tra lại đường truyền xem sao nhé!", success: true})
        }

    }

    return <>
        <div >
            <div className="text-center"><h3>Chào <span className={"fw-bold text-warning"}>{user.name}</span> đến với trang phản hồi của nhà hàng tiệc cưới Golden Center</h3></div>
            <form onSubmit={(e) => {submitFeedback(e, user.id)}}>
                <input hidden value={user.id} name="customer" />
                <label className="d-block b-2">Mời bạn chọn loại dịch vụ bạn muốn phản hồi:  </label>
                <label className="ms-1 me-2" for="ft-1">Nhà hàng</label>
                <input type="radio" name="feedbackType" id="ft-1" value="Nhà hàng" />
                <label className="ms-4 me-2" for="ft-2">Tiệc cưới</label>
                <input type="radio" name="feedbackType" id="ft-2" value="Tiệc cưới" />
                <label className="ms-4 me-2"  for="ft-3">Dịch vụ cưới</label>
                <input type="radio" name="feedbackType"id="ft-3" value="Dịch vụ cưới" />
                <label className="ms-4 me-2"  for="ft-4">Khác</label>
                <input type="radio" name="feedbackType"  id="ft-4" value="Khác" />
                <textarea placeholder="" name="comment" className="form-control mt-2" rows={10} />
                <button className="btn btn-primary px-5 py-2 mt-3">Gửi phản hồi</button>
                <p className={state.success ? "text-success" : "text-danger"}>{state.message}</p>
            </form>
        </div>
    </>
}

export default UserCreateFeedback;