import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { createContext, useReducer } from "react";
import MyUserReducer from "./reducers/MyUserReducer";
import cookie from "react-cookies";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";
import Image from "./components/Image";
import Service from "./components/Service";
import MHome from "./m_components/MHome";
import Home from "./components/Home";
import Dashboard from "./m_components/path/Dashboard";
import Header from "./layout/Header";
import { Container } from "react-bootstrap";
import Footer from "./layout/Footer";
import MHeader from "./m_components/m_layouts/MHeader";
import MNav from "./m_components/m_layouts/MNav";
export const MyUserContext = createContext();

const App = () => {
  const [user, dispatch] = useReducer(
    MyUserReducer,
    cookie.load("user") || null
  );
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<UserDetails />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/image" element={<Image />} />
            <Route path="/service" element={<Service />} />
            <Route exact path="*" element={<Home />} />
            <Route exact path="admin/*" element={<MHome />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </MyUserContext.Provider>
  );
};

export default App;
