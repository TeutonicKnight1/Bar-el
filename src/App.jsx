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
  const [finalProfit, setFinalProfit] = useState([0, 0]);
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

  const [netPrice, setNetPrice] = useState({
    bar: {
      beer: {
        Cheshskoe: 100,
        Blanch: 120,
      },
      snacks: {
        Chips: 75,
        SucharikiSouce: 40,
        Suchariki: 25,
      },
    },
    kitchen: {
      setOnTwo: 200,
      setOnFour: 350,
      setOnSix: 600,
    },
  });

  const finalProfitCount = () => {
    setFinalProfit(
      [cart.reduce((acc, el) => acc + el.price * el.count, 0)],
      [cart.reduce((acc, el) => acc + el.netPrice * el.count, 0)]
    );
  };

  function addToCart() {
    if (cheshskoeCount > 0) {
      setCart((prev) => [
        ...prev,
        {
          id: purchaseNumber,
          name: "Cheshskoe",
          count: cheshskoeCount,
          price: prices.bar.beer.Cheshskoe,
          netPrice: netPrice.bar.beer.Cheshskoe,
        },
      ]);
      setPurchaseNumber((prev) => prev + 1);
    }
    if (blanchCount > 0) {
      setCart((prev) => [
        ...prev,
        {
          id: purchaseNumber + 1,
          name: "Blanch",
          count: blanchCount,
          price: prices.bar.beer.Blanch,
          netPrice: netPrice.bar.beer.Blanch,
        },
      ]);
      setPurchaseNumber((prev) => prev + 1);
    }

    finalProfitCount();
    setCheshskoeCount(0);
    setBlanchCount(0);
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
        <h1>
          Итоговый доход:{finalProfit[0]}
        </h1>
        <h1>
          Итоговая прибыль:{finalProfit[1]}
        </h1>
      </div>
    </div>
  );
}

export default App;
