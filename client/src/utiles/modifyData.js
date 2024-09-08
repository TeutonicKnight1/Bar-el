export function modifyData(
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
  
    Object.keys(ordersBody).forEach((key) => {
      orderBody.push({
        id: ++id,
        nameOfPosition: key,
        positionPrice: menu[key].price,
        positionCount: ordersBody[key],
        positionNetProfit: menu[key].net_price,
      });
    });
  
    let dateFormat = { date: date.slice(0, 10), time: date.slice(11, 19) };
    dateFormat = dateFormat.date + " " + dateFormat.time;
  
    return {
      idOrder,
      tableNumber,
      receipt,
      netProfit,
      date: dateFormat,
      orderBody,
    };
  }