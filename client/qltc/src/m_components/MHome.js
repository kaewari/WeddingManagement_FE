import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";

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
    return <>
        <div></div>
        <Routes>
            
        {userRoutes.map((route) => 
            <Route path={route.path} element={route.element} />)}
        </Routes>
    </>
}

export default MHome;