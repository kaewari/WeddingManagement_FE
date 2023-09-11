import { useContext, useEffect } from "react";
import { GrUserSettings } from "react-icons/gr";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { MyUserContext } from "../App";
import MHeader from "./m_layouts/MHeader";
import MNav from "./m_layouts/MNav";
import Dashboard from "./path/Dashboard";
import Branch from "./path/branch/Branch";
import Dish from "./path/dish/Dish";
import Employee from "./path/employee/Employee";
import Order from "./path/order/Order";
import User from "./path/user/User";
import Wedding from "./path/wedding/Wedding";
import WeddingService from "./path/weddingService/WeddingService";
import EmployeeDetails from "./path/employee/EmployeeDetails";
import EmployeeEdit from "./path/employee/EmployeeEdit";

const userRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/branch",
    element: <Branch />,
  },
  {
    path: "/dish",
    element: <Dish />,
  },
  {
    path: "/employee",
    element: <Employee />,
  },
  {
    path: "/employee/view",
    element: <EmployeeDetails />,
  },
  {
    path: "/employee/edit",
    element: <EmployeeEdit />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/wedding",
    element: <Wedding />,
  },
  {
    path: "/wedding-service",
    element: <WeddingService />,
  },
  {
    path: "/user",
    element: <User />,
  },
];

const MHome = () => {
  const [user] = useContext(MyUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(user != null && acceptsRole.find((r) => r === user.role))) {
      navigate("/login");
    }
  });

  return (
    <>
      <MHeader />
      <div className="d-flex p-2">
        <MNav links={links} style={{ height: "100%" }} />
        <div className="col-10 ">
          <Routes>
            {userRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
        <div className="position-absolute ms-2 mb-2 start-0 bottom-0 text-primary">
          <Link to="/details" className="text-decoration-none">
            <GrUserSettings size={25} /> Tài khoản
          </Link>
        </div>
      </div>
    </>
  );
};

export default MHome;

const acceptsRole = ["Admin", "Manager", "Waiter"];

const links = [
  {
    name: "Dashboard",
    link: "/admin",
    permission: null,
  },
  {
    name: "Branch",
    link: "/admin/branch",
    permission: "BRANCH",
  },
  {
    name: "Dish",
    link: "/admin/dish",
    permission: "ORDER",
  },
  {
    name: "Order",
    link: "/admin/order",
    permission: "ORDER",
  },
  {
    name: "Wedding Order",
    link: "/admin/wedding",
    permission: "WEDDING",
  },
  {
    name: "Wedding Service",
    link: "/admin/wedding-service",
    permission: "WEDDING",
  },
  {
    name: "Employee",
    link: "/admin/employee",
    permission: "ORDER",
  },
  {
    name: "User",
    link: "/admin/user",
    permission: "ORDER",
  },
];
