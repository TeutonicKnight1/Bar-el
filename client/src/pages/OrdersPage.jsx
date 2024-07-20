import Header from "../components/Header"
import OrderTable from "../components/OrderTable"

import { useState } from "react";

const OrdersPage = () => {
    const [floatingMenuStatus, setFloatingMenuStatus] = useState(false);

    const handleFloatingMenu = () => {
        setFloatingMenuStatus(!floatingMenuStatus);
    }

    return (
        <div className="orders_page">
            <Header floatingMenuCallback={handleFloatingMenu}/>
            <OrderTable/>
        </div>
    )
}

export default OrdersPage