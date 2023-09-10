import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Login from "./Login";
import Index from "./Index";
import UserDetails from "./UserDetails";
import Menu from "./Menu";
import Image from "./Image";
import { Container } from "react-bootstrap";
import Service from "./Service";
import { useReducer } from "react";
import MyUserReducer from "../reducers/MyUserReducer";
import cookie from "universal-cookie";
import { MyUserContext } from "../App";

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Container>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details" element={<UserDetails />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/image" element={<Image />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
