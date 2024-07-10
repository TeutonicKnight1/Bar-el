import "./App.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";

import ChangeCartCounter from "./UI/ChangeCartCounter";
import MenuItemsGrid from "./components/MenuItemsGrid";
import OrderTableSimple from "./components/OrderTableSimple";

//import { getMenu, getOrders, userLogin } from "./axios/axios";

import { addToCart } from "./store/cartSlice";
import { nullification, increment, decrement } from "./store/counterSlice";

import { fetchMenu } from "./store/menuSlice";

import data from "./data";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const countPoints = useSelector((state) => state.counter.points);
  const menu = useSelector((state) => state.menu.items);
  console.log(menu);
  const cart = useSelector((state) => state.cart.cart);

  const [finalProfit, setFinalProfit] = useState([0, 0]);
  const [numberOfTable, setNumberOfTable] = useState(1);

  const [counter, setCounter] = useState(() => {
    let obj = {};
    console.log(data.menu.prices);
    Object.keys(data.menu.prices).forEach((key) => {
      obj[key] = 0;
    })
    return obj;
  });

  const handleCounter = (key, action) => {
    let newCounter = {};
    setCounter((prevCounters) => {
      if (action === "increment") {
        newCounter = { ...prevCounters, [key]: prevCounters[key] + 1 };
        dispatch(increment({ key }));
      } else if (action === "decrement") {
        newCounter = { ...prevCounters, [key]: prevCounters[key] - 1 };
        dispatch(decrement({ key }));
      }
      return newCounter;
    });
  };

  function nullificationCounter() {
    setCounter(() => {
      let obj = {};
      Object.keys(data.menu.prices).forEach((key) => {
        obj[key] = 0;
      });
      return obj;
    });
  }

  useEffect(() => {
    let sumPrices = 0;
    let sumNetPrices = 0;

    Object.keys(cart).forEach((key) => {
      Object.keys(cart[key]).forEach((key2) => {
        sumPrices += cart[key][key2] * data.menu.prices[key2];
        sumNetPrices += cart[key][key2] * data.menu.netPrices[key2];
      })
    })
    sumNetPrices = sumPrices - sumNetPrices;

    setFinalProfit([sumPrices, sumNetPrices]);
  }, [cart, data.menu.prices, data.menu.netPrices]);

  function handleAddToCart() {
    dispatch(addToCart({ keysForUpdate: countPoints, numberOfTable }));
    dispatch(nullification());
    nullificationCounter();
  }

  return (
    <div>
      <div className="main_page">
        <div className="input_purchase">
          <div className="cheshskoe_form">
            <Typography variant="h4" gutterBottom>
              Стол номер:
            </Typography>
            <ChangeCartCounter
              count={numberOfTable}
              callback={setNumberOfTable}
            />
          </div>
          <MenuItemsGrid callback={handleCounter} counter={counter} />
          <Button variant="contained" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
      </div>
      <OrderTableSimple />
      <div>
        <h1>Итоговый доход:{finalProfit[0]}</h1>
        <h1>Итоговая прибыль:{finalProfit[1]}</h1>
      </div>
    </div>
  );
}

export default App;
