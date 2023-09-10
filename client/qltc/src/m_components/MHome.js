import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import MHeader from "./m_layouts/MHeader";
import MNav from "./m_layouts/MNav";
import {GrUserSettings} from "react-icons/gr"
import { useContext, useEffect } from "react";
import { MyUserContext } from "../App";

const userRoutes = [
    {
        path: "/",
        element: <div>Trang chu admin</div>
    },{
        path: "/branch",
        element: <div>1</div>
    },{
        path: "/branch/create",
        element: <div>12 create</div>
    }
]

const MHome = () => {

    const [user] = useContext(MyUserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!(user != null && acceptsRole.find(r => r === user.role))) {
            navigate("/login")
        }
    })

    return <>
        <MHeader />
        <div className="d-flex p-2">
            <MNav links={links} style={{height: "100%"}}/>
            <div className="col-10 border rounded" >
                <Routes>
                {userRoutes.map((route, index) => 
                    <Route key={index} path={route.path} element={route.element} />)}
                </Routes>
            </div>
            <div className="position-absolute ms-2 mb-2 start-0 bottom-0 text-primary">
                <Link to="/details" className="text-decoration-none">
                <GrUserSettings size={25}/> Tài khoản
                </Link>    
            </div>
        </div>
        
    </>
}

export default MHome;

const acceptsRole = ["Admin", "Manager", "Waiter"]

const links = [
    {
        name: "Dashboard",
        link: "/admin",
        permission: null
    },
    {
        name: "Branch",
        link: "/admin/branch",
        permission: "BRANCH"
    },
    {
        name: "Dish",
        link: "/admin/order",
        permission: "ORDER"
    },
    {
        name: "Order",
        link: "/admin/order",
        permission: "ORDER"
    },
    {
        name: "Wedding Order",
        link: "/admin/wedding",
        permission: "WEDDING"
    },
    {
        name: "Wedding Service",
        link: "/admin/wedding-service",
        permission: "WEDDING"
    },
    {
        name: "Employee",
        link: "/admin/employee",
        permission: "ORDER"
    },
    {
        name: "User",
        link: "/admin/user",
        permission: "ORDER"
    }
]