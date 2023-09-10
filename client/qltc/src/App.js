import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import React, { createContext, useReducer } from "react";
import MyUserReducer from "./reducers/MyUserReducer";
import cookie from "react-cookies";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";
import Image from "./components/Image";
import MHome from "./m_components/MHome";
import Home from "./components/Home";
export const MyUserContext = createContext();

const App = () => {
  const [user, dispatch] = useReducer(
    MyUserReducer,
    cookie.load("user") || null
  );
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Container>
          <Routes>
            <Route exact path="*" element={<Home />} />
            <Route exact path="admin/*" element={<MHome />} />
          </Routes>
        </Container>

      </BrowserRouter>
    </MyUserContext.Provider>
  );
};

export default App;
{/* <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<UserDetails />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/image" element={<Image />} /> */}