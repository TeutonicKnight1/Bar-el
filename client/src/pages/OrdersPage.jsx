import { useSelector } from "react-redux";

import { Button } from "@mui/material";

import OrderTable from "../components/OrderTable";

import { modifyData } from "../utiles/modifyData";
import { generateReport } from "../utiles/generateReport";

const OrdersPage = () => {
  const orders = useSelector((state) => state.activeOrders.orders);
  const menu = useSelector((state) => state.menu.items);

  const rows = orders
    .slice()
    .reverse()
    .map((order) => {
      return modifyData(
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
    <div className="orders_page">
      <OrderTable rows={rows} />
      <Button
        variant="contained"
        className="orders_page_button"
        onClick={() => generateReport(rows)}
      >
        Создать отчёт
      </Button>
    </div>
  );
};

export default OrdersPage;
