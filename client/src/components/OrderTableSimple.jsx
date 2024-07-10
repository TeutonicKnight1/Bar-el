import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function createRow(id, tableIndex, name, count, price, netPrice) {
  return { id, tableIndex, name, count, price, netPrice };
}

export default function OrderTableSimple() {
  const data = useSelector((state) => state.cart.cart);
  const menu = useSelector((state) => state.menu);
  let [rows, setRows] = useState([]);

  function createData() {
    let id = 0;
    const newRows = [];

    data.forEach((item, tableIndex) => {
      if (item && Object.keys(item).length > 0) {
        Object.keys(item).forEach((nameKey) => {
          id += 1;
          newRows.push(
            createRow(
              id,
              tableIndex, // Используем исходный индекс как номер стола
              nameKey,
              item[nameKey],
              menu.prices[nameKey],
              menu.netPrices[nameKey]
            )
          );
        });
      }
    });

    setRows(newRows);
  }

  useEffect(() => {
    createData();
    console.log(rows);
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Номер стола</TableCell>
            <TableCell align="right">Позиция</TableCell>
            <TableCell align="right">Количество</TableCell>
            <TableCell align="right">Сумма</TableCell>
            <TableCell align="right">Себестоимость</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.tableIndex}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.netPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

OrderTableSimple.propTypes = {
  rows: PropTypes.array,
};
