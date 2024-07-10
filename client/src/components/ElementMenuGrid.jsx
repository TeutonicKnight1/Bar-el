import ChangeCartCounterMenu from "../UI/ChangeCartCounterMenu";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "../styles/index.scss";

const ElementMenuGrid = ({ text, image, price, counter, callback }) => {
  const [memoCount, setMemoCount] = useState(counter);

  useEffect(() => {
    setMemoCount(counter);
  }, [counter]);

  function handleIncrement() {
    setMemoCount((prevCount) => {
      const newCount = prevCount + 1;
      return newCount;
    });
    callback(text, "increment");
  }

  function handleDecrement() {
    
    setMemoCount((prevCount) => {
      const newCount = prevCount - 1;
      return newCount;
    });
    callback(text, "decrement");
  }

  return (
    <div className="element-menu">
      <img src={image} alt={text} className="element-menu-img" />
      <div className="element-menu-text">
        <p>{text}</p>
        <p>Цена: {price} руб.</p>
        <div className="element-menu-buttons">
          <ChangeCartCounterMenu
            count={memoCount}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>
      </div>
    </div>
  );
};

ElementMenuGrid.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  counter: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
};

export default ElementMenuGrid;
