import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home"
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { createContext, useReducer } from "react";
import MyUserReducer from "./reducers/MyUserReducer";
import cookie from "react-cookies";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";

export const MyUserContext = createContext();

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
    <BrowserRouter>
      <Header />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details" element={<UserDetails />} />
        </Routes>
      </Container>

      <Footer />
    </BrowserRouter>
    </MyUserContext.Provider>
  );
}

export default App;