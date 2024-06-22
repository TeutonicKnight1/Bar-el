import { Grid, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { increment } from "../store/counterSlice";
const MenuItemsGrid = ({}) => {
  const dispatch = useDispatch();

  function addToCart() {
    dispatch(increment());
    console.log(1);
  }


  return (
    <div className="menu__grid">
      <Grid container spacing={2} sx={{ margin: "10px" }}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }} onClick={addToCart}>
            <Typography variant="h5">Чешское</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5">Бланш</Typography>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5">Сет на 2</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MenuItemsGrid;
