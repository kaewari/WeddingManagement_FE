import { Route, Routes } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Login from "./Login";
import Index from "./Index";
import UserDetails from "./UserDetails";
import Menu from "./Menu";
import Image from "./Image";

const Home = () => {
    return <>
    <Header />
        <Routes>
            <Route index element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<UserDetails />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/image" element={<Image />} />
        </Routes>
    <Footer />
    </>
}

export default Home;