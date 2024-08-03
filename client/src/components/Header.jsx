import menuIcon from "../assets/menuIcon.png";
import accountIcon from "../assets/accountIcon.png";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const Header = ({floatingMenuCallback}) => {

  const handleFloatingMenu = () => {
    floatingMenuCallback();
  };

  return (
    <header className="header">
        <button className="header-button" onClick={handleFloatingMenu}>
          <img src={menuIcon} className="header-img" />
        </button>
      <h1 className="header-h1">
        <p className="header-h1-bar">Bar</p>
        <p className="header-h1-el" >&#39;эль</p>
      </h1>
      {/* <Link to="/user" className="header-button"> */}
      <button className="header-button" >
        <img src={accountIcon} className="header-img" />
      </button>
    </header>
  );
};

Header.propTypes = {
  floatingMenuCallback: PropTypes.func.isRequired,
};

export default Header;
