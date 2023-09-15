import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Image from "./Image";
import Index from "./Index";
import Login from "./Login";
import Menu from "./Menu";
import UserCreateFeedback from "./UserCreateFeedback";
import UserDetails from "./UserDetails";
import Register from "./Register";

const Home = () => {
    return (
      <>
        <Container>
          <Header />
          <Routes>
            <Route index element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<UserDetails />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/image" element={<Image />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feedback" element={<UserCreateFeedback />} />
          </Routes>
          <Footer />
        </Container>
      </>
    );
}

export default Home;