import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

import Header from "../components/Header";
import ChangeCartCounter from "../UI/ChangeCartCounter";
import MenuItemsGrid from "../components/MenuItemsGrid";
import OrderTableSimple from "../components/OrderTableSimple";
import FloatingMenu from "../components/FloatingMenu";

//import { getMenu, getOrders, userLogin } from "./axios/axios";
import { createOrder, updateOrder } from "../axios/axios";

import { addToCart } from "../store/cartSlice";
import { nullification, increment, decrement } from "../store/counterSlice";
import { toast } from "react-toastify";

function orderRow(numbersOfTable, ordersBody, menu) {
  const currentDate = new Date();
  const utcTime = currentDate.getTime(); // Получаем текущее время в формате UTC в миллисекундах
  const offset = 8 * 60 * 60 * 1000; // Поправка на часовой пояс +8 часа в миллисекундах
  const adjustedTime = utcTime + offset;
  currentDate.setTime(adjustedTime);

  const createdAt = currentDate.toISOString().slice(0, 19).replace("T", " ");

  let receipt = 0;

  console.log(menu, ordersBody);
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

function updateOrdersBody(numbersOfTable, ordersBody, cart, menu) {
  let netProfit = 0;
  let receipt = 0;
  const combined = {};

  const currentDate = new Date();

  for (const key in cart[numbersOfTable]) {
    if (Object.prototype.hasOwnProperty.call(cart[numbersOfTable], key)) {
      combined[key] = cart[numbersOfTable][key];
    }
  }

  for (const key in ordersBody) {
    if (Object.prototype.hasOwnProperty.call(ordersBody, key)) {
      if (Object.prototype.hasOwnProperty.call(combined, key)) {
        combined[key] += ordersBody[key];
      } else {
        combined[key] = ordersBody[key];
      }
    }
  }

  Object.keys(combined).forEach((key) => {
    if (combined[key] === 0) {
      delete combined[key];
    }
  });

  console.log(combined);

  const createdAt = currentDate.toISOString().slice(0, 19).replace("T", " ");

  Object.keys(combined).forEach((key) => {
    receipt += menu[key].price * combined[key];
  });

  Object.keys(combined).forEach((key) => {
    netProfit +=
      menu[key].price * combined[key] - menu[key].net_price * combined[key];
  });

  return {
    tableNumber: numbersOfTable,
    ordersBody: combined,
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

  const [statusFloatingMenu, setStatusFloatingMenu] = useState(false);

  const [counter, setCounter] = useState(() => {
    let obj = {};
    Object.keys(menu).forEach((key) => {
      obj[menu[key].name] = 0;
    });
    return obj;
  });

  const handleCounter = useCallback(
    (nameKey, action) => {
      setCounter((prevCounters) => {
        const newCounter = { ...prevCounters };
        if (action === "increment") {
          newCounter[nameKey] = prevCounters[nameKey] + 1;
          dispatch(increment({ key: nameKey }));
        } else if (action === "decrement") {
          newCounter[nameKey] = prevCounters[nameKey] - 1;
          dispatch(decrement({ key: nameKey }));
        }
        return newCounter;
      });
    },
    [dispatch]
  );

  const nullificationCounter = useCallback(() => {
    setCounter(() => {
      let obj = {};
      Object.keys(menu).forEach((key) => {
        obj[menu[key].name] = 0;
      });
      return obj;
    });
  }, [menu]);

  const handleFloatingMenu = useCallback(() => {
    setStatusFloatingMenu(!statusFloatingMenu);
  }, [statusFloatingMenu]);

  const calculatedFinalProfit = useMemo(() => {
    let sumPrices = 0;
    let sumNetPrices = 0;

    Object.keys(cart).forEach((key) => {
      Object.keys(cart[key]).forEach((key2) => {
        console.log(sumPrices, sumNetPrices);
        sumPrices += cart[key][key2] * menu[key2].price;
        sumNetPrices += cart[key][key2] * menu[key2].net_price;
      });
    });
    sumNetPrices = sumPrices - sumNetPrices;

    return [sumPrices, sumNetPrices];
  }, [cart, menu]);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ keysForUpdate: countPoints, numberOfTable }));
    setFinalProfit(calculatedFinalProfit);
    dispatch(nullification());
    nullificationCounter();

    if (!cart[numberOfTable]) {
      createOrder(orderRow(numberOfTable, countPoints, menu));

      toast.success("Заказ успешно создан", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      updateOrder(
        numberOfTable,
        updateOrdersBody(numberOfTable, countPoints, cart, menu)
      );

      toast.success("Заказ успешно обновлен", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [
    calculatedFinalProfit,
    countPoints,
    numberOfTable,
    cart,
    menu,
    dispatch,
    nullificationCounter,
  ]);

  return (
    <div>
      <div className="main_page">
        <Header floatingMenuCallback={handleFloatingMenu} />
        <div className="input_purchase">
          <div className="cheshskoe_form">
            <p className="input_purchase_p">Номер стола:</p>
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

      <FloatingMenu
        statusFloating={statusFloatingMenu}
        callback={handleFloatingMenu}
      />
    </div>
  );
};

export default MainPage;
