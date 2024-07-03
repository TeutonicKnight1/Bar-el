import "./App.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";

import ChangeCartCounter from "./UI/ChangeCartCounter";
import MenuItemsGrid from "./components/MenuItemsGrid";
import OrderTableSimple from "./components/OrderTableSimple";


import { addToCart } from "./store/cartSlice";
import { addOrder } from "./store/activeOrdersSlice";
import { nullification } from "./store/counterSlice";
import { setPrices, setNetPrices } from "./store/menuSlice";

import data from "./data";

function createDataOrder(id, name, count, price, netPrice) {
  return { id, name, count, price, netPrice };
}

function App() {
  useEffect(() => {
    dispatch(setPrices(data.menu.prices));
    dispatch(setNetPrices(data.menu.netPrices));
  }, []);

  const dispatch = useDispatch();
  const countPoints = useSelector((state) => state.counter.points);
  const menu = useSelector((state) => state.menu);

  const [finalProfit, setFinalProfit] = useState([0, 0]);
  const [numberOfTable, setNumberOfTable] = useState(1);

  const [cheshskoeCount, setCheshskoeCount] = useState(0);
  const [blanchCount, setBlanchCount] = useState(0);

  useEffect(() => {
    //console.log(countPoints);
  }, [countPoints]);

  function handleFinalProfit() {
    let sumPrices = 0;
    let sumNetPrices = 0;

    Object.keys(countPoints).forEach((key) => {
      if (menu.prices[key]) {
        sumPrices += menu.prices[key] * countPoints[key];
        sumNetPrices += menu.netPrices[key] * countPoints[key];
      }
    });
    sumNetPrices = sumPrices - sumNetPrices;

    setFinalProfit([sumPrices, sumNetPrices]);
  }

  function handleAddToCart() {
    dispatch(addToCart({ keysForUpdate: countPoints, numberOfTable }));
    dispatch(nullification());
    handleFinalProfit();
  }

  return (
    <div>
      <div className="main_page">
        <div className="prices">
          <Typography variant="h4" gutterBottom>
            Цены:{" "}
          </Typography>
        </div>
        <div className="input_purchase">
          <div className="cheshskoe_form">
            <Typography variant="h4" gutterBottom>
              Cheshskoe:{" "}
            </Typography>
            <ChangeCartCounter
              count={cheshskoeCount}
              callback={setCheshskoeCount}
            />
          </div>

          <div className="cheshskoe_form">
            <Typography variant="h4" gutterBottom>
              Blanch:
            </Typography>
          </div>


          {/* <button className="button" onClick={() => console.log(count)}>вывод</button> */}


          <div className="cheshskoe_form">
            <Typography variant="h4" gutterBottom>
              Стол номер:
            </Typography>
            <ChangeCartCounter count={numberOfTable} callback={setNumberOfTable} />
          </div>
          <MenuItemsGrid />
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
