import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useCallback } from "react";

import OrdersPage from "./pages/OrdersPage";
import SignLogInPage from "./pages/SignLogInPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import MouseButtonHandler from "./utiles/MouseButtonHandler";
import Header from "./components/Header";
import FloatingMenu from "./components/FloatingMenu";

const RouterComponent = () => {
  const [statusFloatingMenu, setStatusFloatingMenu] = useState(false);
  const [tokenHaving, setTokenHaving] = useState(localStorage.getItem("token"));

  const handleFloatingMenu = useCallback(() => {
    setStatusFloatingMenu(!statusFloatingMenu);
  }, [statusFloatingMenu]);

  return (
    <Router>
      {!tokenHaving ? (
        <SignLogInPage setTokenHaving={setTokenHaving} />
      ) : (
        <>
          <Header floatingMenuCallback={handleFloatingMenu} />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/signlogin" element={<SignLogInPage />} />
            {/* <Route path="/user" element={<User />} />
        <Route path="/admin" element={<a />} /> */}
          </Routes>
          <MouseButtonHandler />
          <ToastContainer />
          <FloatingMenu
            statusFloating={statusFloatingMenu}
            callback={handleFloatingMenu}
          />
        </>
      )}
    </Router>
  );
};

export default RouterComponent;
