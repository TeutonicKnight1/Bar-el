import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";

import ChangeCartCounter from "../UI/ChangeCartCounter";
import MenuItemsGrid from "../components/MenuItemsGrid";
import OrderTableSimple from "../components/OrderTableSimple";

//import { getMenu, getOrders, userLogin } from "./axios/axios";
import { createOrder } from "../axios/axios";

import { addToCart } from "../store/cartSlice";
import { nullification, increment, decrement } from "../store/counterSlice";

function orderRow(numbersOfTable, ordersBody, menu) {
  const currentDate = new Date(); // Создаем объект Date с текущей датой и временем
  // Преобразуем дату в формат DATETIME, который будет понятен серверу
  const createdAt = currentDate.toISOString().slice(0, 19).replace("T", " ");

  let receipt = 0;
  Object.keys(ordersBody).forEach((key) => {
    receipt += menu[key].price * ordersBody[key];
  });

  let netProfit = 0;
  Object.keys(ordersBody).forEach((key) => {
    netProfit +=
      menu[key].price * ordersBody[key] - menu[key].net_price * ordersBody[key];
  });

  return {
    tableNumber: numbersOfTable,
    ordersBody,
    receipt,
    netProfit,
    createdAt,
  };
}

const MainPage = () => {
  const dispatch = useDispatch();
  const countPoints = useSelector((state) => state.counter.points);
  const menu = useSelector((state) => state.menu.items);
  const cart = useSelector((state) => state.cart.cart);

  const [finalProfit, setFinalProfit] = useState([0, 0]);
  const [numberOfTable, setNumberOfTable] = useState(1);

  const [counter, setCounter] = useState(() => {
    let obj = {};
    Object.keys(menu).forEach((key) => {
      obj[menu[key].name] = 0;
    });
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
      Object.keys(menu).forEach((key) => {
        obj[key.price] = 0;
      });
      return obj;
    });
  }

  useEffect(() => {
    let sumPrices = 0;
    let sumNetPrices = 0;

    Object.keys(cart).forEach((key) => {
      Object.keys(cart[key]).forEach((key2) => {
        sumPrices += cart[key][key2] * menu[key2].price;
        sumNetPrices += cart[key][key2] * menu[key2].net_price;
      });
    });
    sumNetPrices = sumPrices - sumNetPrices;

    setFinalProfit([sumPrices, sumNetPrices]);
  }, [cart, menu]);

  function handleAddToCart() {
    if (!cart[numberOfTable]) {
      createOrder(orderRow(numberOfTable, countPoints, menu));
    } else {
      alert("Заказ для этого стола уже сформирован!");
    }

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
};

export default MainPage;
