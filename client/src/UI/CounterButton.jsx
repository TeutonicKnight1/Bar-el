import { useState } from "react";
import { useDispatch } from "react-redux";
//import { addItem, removeItem } from "../features/cart/cartSlice";
import classes from './moduleSCSS/counterButton.module.scss';

import PropTypes from "prop-types";

const CounterButton = ({ item }) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const handleAdd = () => {
    setCount(count + 1);
    //dispatch(addItem({ item }));
  };

  const handleRemove = () => {
    if (count > 0) {
      setCount(count - 1);
      //dispatch(removeItem({ item }));
    }
  };

  return (
    <div className="classes.counter-button-container">
      <button onClick={handleRemove} disabled={count === 0}>
        -
      </button>
      <span className="classes.count-display">{count}</span>
      <button onClick={handleAdd}>+</button>
    </div>
  );
};

CounterButton.propTypes = {
  item: PropTypes.object,
};

export default CounterButton;
