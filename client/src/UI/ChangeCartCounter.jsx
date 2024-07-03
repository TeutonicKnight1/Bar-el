import PropTypes from 'prop-types';

import classes from './moduleSCSS/addToCartButton.module.scss';
import plusIcon from '../assets/plusIcon.png';
import minusIcon from '../assets/minusIcon.png';

function ChangeCartCounter({count, callback}) {
    const handleClickPlus = () => {
        callback((count) => count + 1);   
    }

    const handleClickMinus = () => {
        if((count - 1) < 0) return;
        
        callback((count) => count - 1);
    }
  return (
    <>
      <div className="cart__element__counter">
        <div className={classes.changeCountContainer}>
          <button
            className={classes.changeCountUpButton}
            onClick={handleClickPlus}
          >
            <img src={plusIcon} className={classes.img} />
          </button>
          <p className={classes.p}>{count}</p>
          <button
            className={classes.changeCountDownButton}
            onClick={handleClickMinus}
          >
            <img src={minusIcon} className={classes.img} />
          </button>
        </div>
      </div>
    </>
  );
}

ChangeCartCounter.propTypes = {
  count: PropTypes.number,
  callback: PropTypes.func
}

export default ChangeCartCounter;
