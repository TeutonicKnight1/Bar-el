import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType } from 'docx';

export async function generateReport(rows) {
  console.log(rows);
  

    const tableHeaders = [
        "Order ID",
        "Table Number",
        "Receipt",
        "Net Profit",
        "Created At",
      ];
      const headerRow = new TableRow({
        children: tableHeaders.map(
          (header) =>
            new TableCell({
              children: [new Paragraph(header)],
            })
        ),
      });
  
      const dataRows = rows.flatMap((order) => {
        const orderRow = new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(order.idOrder.toString())],
            }),
            new TableCell({
              children: [new Paragraph(order.tableNumber.toString())],
            }),
            new TableCell({
              children: [new Paragraph(order.receipt.toString())],
            }),
            new TableCell({
              children: [new Paragraph(order.netProfit.toString())],
            }),
            new TableCell({ children: [new Paragraph(order.date)] }),
          ],
        });
  
        const itemRows = order.orderBody.map(
          (item) =>
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("")] }), // Отступ для вложенных строк
                new TableCell({
                  children: [new Paragraph(`- ${item.nameOfPosition}`)],
                }),
                new TableCell({
                  children: [new Paragraph(item.positionPrice.toString())],
                }),
                new TableCell({
                  children: [new Paragraph(item.positionCount.toString())],
                }),
                new TableCell({
                  children: [new Paragraph(item.positionNetProfit.toString())],
                }),
              ],
            })
        );
  
        return [orderRow, ...itemRows];
      });
  
      const table = new Table({
        rows: [headerRow, ...dataRows],
        width: { size: 100, type: WidthType.PERCENTAGE },
      });
  
      const doc = new Document({
        sections: [{ children: [table] }],
      });
  
      try {
        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "report" + new Date().toISOString() + ".docx";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (error) {
        console.error("Error generating report:", error);
      }
}