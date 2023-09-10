import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyUserContext } from "../../App";
import { useNavigate } from "react-router-dom";


const MHeader = () => {

  const [user, dispatch] = useContext(MyUserContext);
  const navigate = useNavigate();
  const logout = () => {
    dispatch({
        "type": "logout",
      });
    navigate("/login");
  }

    return <>
        <div className="d-flex justify-content-between p-2">
            <div className="text-uppercase"><h2>Nhà hàng tiệc cưới Golden Center</h2></div>
            <div className="d-flex align-items-center">
                <div className="ps-2 pe-2">
                    <Link to="/details" className="text-decoration-none w-100 d-inline-block" >
                        <img className="rounded-circle h-100" style={{width: "50px"}}
                        src={ user != null && user.avatar != null ? user.avatar :
                            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
                            alt="profile"/>
                    </Link>
                </div>
                {user != null && <div className="ps-2 pe-2">
                    <button className="btn btn-secondary" onClick={logout} >Đăng xuất</button>
                </div>}
            </div>
        </div>
    </>
}

export default MHeader;