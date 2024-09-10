import { PropTypes } from "prop-types";

const ReportSummary = ({ data }) => {
  console.log(data);

  return (
    <div className="report_summary">
      <p>
        Всего заказов:{" "} {data.length}
      </p>
      <p>
        Общая прибыль:{" "}
        {data.map((item) => item.netProfit).reduce((a, b) => a + b, 0)}
      </p>
      <p>
        Общая сумма чеков:{" "}
        {data.map((item) => item.receipt).reduce((a, b) => a + b, 0)}
      </p>
      <p>
        Период:{" "} {"c " + data[data.length - 1].date.slice(0,10).split("-").reverse().join(".") + "  по  " + data[0].date.slice(0,10).split("-").reverse().join(".")}
      </p>
    </div>
  );
};

ReportSummary.propTypes = {
  data: PropTypes.array,
};

export default ReportSummary;
