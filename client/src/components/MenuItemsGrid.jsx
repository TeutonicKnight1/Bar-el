import { Grid } from "@mui/material";

import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import ElementMenuGrid from "./ElementMenuGrid";

import data from "../data";

const MenuItemsGrid = ({ callback, counter }) => {
  const menu = useSelector((state) => state.menu) || data.menu;
  return (
    <div className="menu__grid">
      <Grid
        container
        spacing={1}
        sx={{ marginTop: "10px", marginBottom: "10px" }}
      >
        {Object.keys(menu.prices).map((key) => (
          <Grid key={key} item xs={0} md={3}>
            <ElementMenuGrid
              key={key}
              image={
                "https://www.nice-beer.ru/wp-content/uploads/2020/03/cheshskoe-barnoe_keg.jpg"
              }
              text={key}
              price={menu.prices[key]}
              callback={callback}
              counter={counter[key]}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

MenuItemsGrid.propTypes = {
  callback: PropTypes.func.isRequired,
  counter: PropTypes.object.isRequired,
};

export default MenuItemsGrid;
