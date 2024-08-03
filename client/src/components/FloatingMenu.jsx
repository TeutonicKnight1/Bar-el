import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const FloatingMenu = ({ statusFloating, callback }) => {
  return (
    <div className={statusFloating ? "floating-menu active" : "floating-menu"}>
      <ul className="floating-menu-ul">
        <li className="floating-menu-li li-main">
          <Link to="/" className="li-main-link" onClick={callback}>
            Главная
          </Link>
        </li>
        <li className="floating-menu-li li-orders">
          <Link to="/orders" className="li-orders-link" onClick={callback}>
            Заказы
          </Link>
        </li>
        <li className="floating-menu-li li-settings" onClick={callback}>
          <p className="li-settings-link">Назад</p>
        </li>
      </ul>
      <div className="floating-menu-li">
        <span className="span-signout-link">Выйти</span>
      </div>
    </div>
  );
};

FloatingMenu.propTypes = {
  statusFloating: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
};

export default FloatingMenu;
