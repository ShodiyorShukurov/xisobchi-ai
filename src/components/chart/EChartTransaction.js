import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import useDashboard from "../../hooks/UseDashboard";
import { data } from "../../mock/data";
import { useMain } from "../../hooks/UseMain";

function EChartTransaction() {
  const { Title } = Typography;
  const { monthStatistics } = useDashboard();
  const { changeValue } = useMain();

  const eChart = {
    series: [
      {
        name: "",
        data: monthStatistics
          ? monthStatistics.map((data) =>
              (Number(data.total_amount)).toFixed(2)
            )
          : [],
        color: "#fff",
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: monthStatistics
          ? monthStatistics.map((data, index) => index + 1)
          : [],
        labels: {
          show: true,
          style: {
            colors: Array(12).fill("#fff"),
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: Array(12).fill("#fff"),
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val, { dataPointIndex }) {
            const monthData = monthStatistics[dataPointIndex];
            return `
              ${data[changeValue]?.dashboard?.total_transactions_month}: ${val} ${
              data[changeValue].sum
            } <br/>
               ${
                 data[changeValue]?.dashboard?.total_transactions_month_percentage
               }: ${
              monthData.percentage_increase
                ? monthData.percentage_increase + " %"
                : "N/A"
            }
            `;
          },
        },
      },
    },
  };

  return (
    <>
      <Title level={5}>
        {data[changeValue].dashboard.transaction_statistics}
      </Title>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
    </>
  );
}

export default EChartTransaction;
