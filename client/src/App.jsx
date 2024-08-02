import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";


import { fetchMenu } from "./store/menuSlice";
import { fetchOrders } from "./store/activeOrdersSlice";
import MainPage from "./pages/MainPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchOrders());
  }, [dispatch]);


  const menuStatus = useSelector((state) => state.menu.status);


  if (menuStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (menuStatus === "failed") {
    return <div>Error</div>;
  }

  return (
    <MainPage/>
  );
}

export default App;
