import { Grid, Typography, Paper, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { increment } from "../store/counterSlice";

const data = ["Чешское", "Бланш", "Сет на 2", "Сет на 4", "Сет на 6"];

const ElementGrid = ({ text }) => {
  const dispatch = useDispatch();
  function addToCart() {
    dispatch(increment({ key: text }));
    console.log(1);
  }

  return (
    <Paper sx={{ padding: "10px" }}>
      <Button
        onClick={addToCart}
        sx={{ width: "100%", color: "black", fontSize: "20px" }}
      >
        {text}
      </Button>
    </Paper>
  );
};

const MenuItemsGrid = ({}) => {
  return (
    <div className="menu__grid">
      <Grid container spacing={2} sx={{marginTop: "10px", marginBottom: "10px"}}>
        {data.map((text) => (
          <Grid key={text} item xs={4}>
            <ElementGrid text={text} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MenuItemsGrid;
