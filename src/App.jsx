import "./App.css";

import { useState } from "react";
import { useSelector } from "react-redux";
import ChangeCartCounter from "./UI/ChangeCartCounter";
import { Button, Typography } from "@mui/material";
import OrderTableSimple from "./components/OrderTableSimple";
import MenuItemsGrid from "./components/MenuItemsGrid";

function App() {
  const [cheshskoeCount, setCheshskoeCount] = useState(0);
  const [blanchCount, setBlanchCount] = useState(0);
  const [purchaseNumber, setPurchaseNumber] = useState(0);
  const [finalProfit, setFinalProfit] = useState([0,0]);
  const [cart, setCart] = useState([]);

  console.log(useSelector((state) => state));
  const prices = useSelector((state) => state.menu.prices);
  const netPrices = useSelector((state) => state.menu.netPrices);
  // const [prices, setprices] = useState({
  //   bar: {
  //     beer: {
  //       Cheshskoe: 150,
  //       Blanch: 190,
  //     },
  //     snacks: {
  //       Chips: 115,
  //       SucharikiSouce: 75,
  //       Suchariki: 50,
  //     },
  //   },
  //   kitchen: {
  //     setOnTwo: 400,
  //     setOnFour: 600,
  //     setOnSix: 1000,
  //   },
  // });

  // const [netPricess, setnetPricess] = useState({
  //   bar: {
  //     beer: {
  //       Cheshskoe: 100,
  //       Blanch: 120,
  //     },
  //     snacks: {
  //       Chips: 75,
  //       SucharikiSouce: 40,
  //       Suchariki: 25,
  //     },
  //   },
  //   kitchen: {
  //     setOnTwo: 200,
  //     setOnFour: 350,
  //     setOnSix: 600,
  //   },
  // });

  function addToCart() {
    

    setCheshskoeCount(0);
    setBlanchCount(0);

    console.log(cart);
  }

  return (
    <div>
      <div className="main_page">
        <div className="prices">
          <h1>Bar</h1>
          <h2>prices</h2>
          <p>Cheshskoe: {prices.bar.beer.Cheshskoe}</p>
          <p>Chips: {prices.bar.snacks.Chips}</p>
          <h2>Net prices</h2>
          <p>Cheshskoe: {netPrices.bar.beer.Cheshskoe}</p>
          <p>Chips: {netPrices.bar.snacks.Chips}</p>
          <h1>Kitchen</h1>
          <h2>prices</h2>
          <p>SetOnTwo: {prices.kitchen.setOnTwo}</p>
          <p>SetOnFour: {prices.kitchen.setOnFour}</p>
          <p>SetOnSix: {prices.kitchen.setOnSix}</p>
          <h2>Net prices</h2>
          <p>SetOnTwo: {netPrices.kitchen.setOnTwo}</p>
          <p>SetOnFour: {netPrices.kitchen.setOnFour}</p>
          <p>SetOnSix: {netPrices.kitchen.setOnSix}</p>
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
              Blanch:{" "}
            </Typography>
            <ChangeCartCounter count={blanchCount} callback={setBlanchCount} />
          </div>

          {/* <button className="button" onClick={() => console.log(count)}>вывод</button> */}

          <MenuItemsGrid />

          <Button variant="contained" onClick={addToCart}>
            Add to cart
          </Button>
        </div>
      </div>
      <OrderTableSimple rows={cart} />
      <div>
        <h1>Итоговый доход: {cart.reduce((acc, el) => acc + el.prices * el.count, 0)}</h1>
        <h1>Итоговая прибыль: {cart.reduce((acc, el) => acc + el.netPrices * el.count, 0)}</h1>
      </div>
    </div>
  );
}

export default App;
