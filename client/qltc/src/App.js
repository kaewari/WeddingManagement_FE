import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { createContext, useReducer } from "react";
import MyUserReducer from "./reducers/MyUserReducer";
import cookie from "react-cookies";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";
import Image from "./components/Image";
import MHome from "./m_components/Home";
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
            <Route exact path="/">
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/details" element={<UserDetails />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/image" element={<Image />} />
            </Route>
            <Route exact path="/user">
              <Route index element={<MHome />} />
            </Route>
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