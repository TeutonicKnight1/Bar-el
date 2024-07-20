import { Grid } from "@mui/material";

import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import ElementMenuGrid from "./ElementMenuGrid";

const MenuItemsGrid = ({ callback, counter }) => {
  const menu = useSelector((state) => state.menu.items);
  return (
    <div className="menu__grid">
      <Grid
        container
        spacing={1}
        sx={{ marginTop: "10px", marginBottom: "10px" }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {Object.keys(menu).map((item) => (
          <Grid key={menu[item].id} item xs={6} md={3}>
            <ElementMenuGrid
              image={menu[item].img}
              text={menu[item].name}
              price={menu[item].price}
              callback={callback}
              counter={counter[item]}
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
