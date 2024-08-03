import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { useSelector } from "react-redux";

function createData(
  idOrder,
  tableNumber,
  receipt,
  netProfit,
  date,
  ordersBody,
  menu
) {
  let orderBody = [];
  let id = 0;

  Object.keys(ordersBody).reverse().forEach((key) => {
    orderBody.push({
      id: ++id,
      nameOfPosition: key,
      positionPrice: menu[key].price,
      positionCount: ordersBody[key],
      positionNetProfit: menu[key].net_price,
    });
  });

  let dateFormat = {date: date.slice(0, 10), time: date.slice(11, 19)};
  dateFormat = dateFormat.date + " " + dateFormat.time;

  return {
    idOrder,
    tableNumber,
    receipt,
    netProfit,
    date: dateFormat,
    orderBody
  };
}

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="Раскрыть строку"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ backgroundColor: "#202020" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.idOrder}
        </TableCell>
        <TableCell align="right">{row.tableNumber}</TableCell>
        <TableCell align="right">{row.receipt}</TableCell>
        <TableCell align="right">{row.netProfit}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Заказ
              </Typography>
              <Table size="small" aria-label="orders">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>Название позиции</TableCell>
                    <TableCell>Количество</TableCell>
                    <TableCell align="right">Сумма</TableCell>
                    <TableCell align="right">Чистая прибыль</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orderBody.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell component="th" scope="row">
                        {order.nameOfPosition}
                      </TableCell>
                      <TableCell>{order.positionCount}</TableCell>
                      <TableCell align="right">{order.positionPrice}</TableCell>
                      <TableCell align="right">
                        {Math.round(order.positionPrice - order.positionNetProfit)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    idOrder: PropTypes.number.isRequired,
    tableNumber: PropTypes.string.isRequired,
    receipt: PropTypes.number.isRequired,
    netProfit: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    orderBody: PropTypes.array.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const orders = useSelector((state) => state.activeOrders.orders);
  const menu = useSelector((state) => state.menu.items);

  const rows = orders.map((order) => {
    return createData(
      order.idorder,
      order.tableNumber,
      order.receipt,
      order.netProfit,
      order.createdAt,
      JSON.parse(order.ordersBody),
      menu
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Номер заказа</TableCell>
            <TableCell align="right">Номер стола</TableCell>
            <TableCell align="right">Сумма заказа</TableCell>
            <TableCell align="right">Чистая прибыль</TableCell>
            <TableCell align="right">Дата заказа</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.idOrder} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
