import ChangeCartCounterMenu from "../UI/ChangeCartCounterMenu";
import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import "../styles/index.scss";

const ElementMenuGrid = ({ text, image, price, counter, callback }) => {
  const [memoCount, setMemoCount] = useState(counter);

  const handleImageError = (e) => {
    e.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMBxhb0K7deiny3Y1FTESaq5B98PDqc-B514viL_LRaMzpEvxOYDN6Zm8_la91vXG8gNI&usqp=CAU";
  };

  useEffect(() => {
    setMemoCount(counter);
  }, [counter]);

  const handleIncrement = useCallback(() => {
    setMemoCount((prevCount) => {
      const newCount = prevCount + 1;
      return newCount;
    });
    callback(text, "increment");
  }, [callback, text]);

  const handleDecrement = useCallback(() => {
    setMemoCount((prevCount) => {
      const newCount = prevCount - 1;
      return newCount;
    });
    callback(text, "decrement");
  }, [callback, text]);

  return (
    <div className="element-menu">
      <img
        onError={handleImageError}
        src={image}
        alt={text}
        className="element-menu-img"
      />
      <div className="element-menu-text">
        <p>{text}</p>
        <p>Цена: {price} руб.</p>
      </div>
      <div className="element-menu-buttons">
        <ChangeCartCounterMenu
          count={memoCount}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
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
