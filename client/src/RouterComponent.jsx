import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import OrdersPage from "./pages/OrdersPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from "./App";
import MouseButtonHandler from "./utiles/MouseButtonHandler";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/orders" element={<OrdersPage />} />
        {/* <Route path="/user" element={<User />} />
      <Route path="/signlogin" element={<SignLogIn />} />
      <Route path="/admin" element={<a />} /> */}
      </Routes>
      <MouseButtonHandler/>
      <ToastContainer/>
    </Router>
  );
};

export default RouterComponent;
