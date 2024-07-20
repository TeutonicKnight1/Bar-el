import styles from './moduleSCSS/addToCartButton.module.scss';
import plusIcon from "../assets/plusIcon.png";
import minusIcon from "../assets/minusIcon.png";

import PropTypes from "prop-types";

function ChangeCartCounterMenu({ count, onIncrement, onDecrement }) {
  const handleClickPlus = () => {
    onIncrement();
  };

  const handleClickMinus = () => {
    //if (count - 1 < 0) return;
    onDecrement();
  };
  return (
    <>
      <div className="cart__element__counter">
        <div className={styles.changeCountContainer}>
          <button
            className={styles.changeCountUpButton}
            onClick={handleClickPlus}
          >
            <img src={plusIcon} className={styles.img} />
          </button>
          <p className={styles.p}>{count}</p>
          <button
            className={styles.changeCountDownButton}
            onClick={handleClickMinus}
          >
            <img src={minusIcon} className={styles.img} />
          </button>
        </div>
      </div>
    </>
  );
}

ChangeCartCounterMenu.propTypes = {
  count: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

export default ChangeCartCounterMenu;
