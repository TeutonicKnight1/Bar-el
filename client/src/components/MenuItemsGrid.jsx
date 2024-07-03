import { Grid, Paper, Button } from "@mui/material";

import { increment } from "../store/counterSlice";

import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import data from "../data";

const ElementGrid = ({ text }) => {
  const dispatch = useDispatch();
  function addToCart() {
    dispatch(increment({ key: text }));
  }

  return (
    <Paper >
      <Button
        onClick={addToCart}
        sx={{ width: "100%", color: "black", fontSize: "20px" }}
      >
        {text}
      </Button>
    </Paper>
  );
};

ElementGrid.propTypes = {
  text: PropTypes.string,
};

const MenuItemsGrid = () => {
  return (
    <div className="menu__grid">
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "10px", marginBottom: "10px" }}
      >
        {Object.keys(data.menu.prices).map((key) => (
          <Paper key={key} sx={{ margin: "5px" }}>
            <ElementGrid text={key} />
          </Paper>
        ))}
      </Grid>
    </div>
  );
};

export default MenuItemsGrid;
