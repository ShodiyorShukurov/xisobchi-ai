import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import useDashboard from "../../hooks/UseDashboard";
import { data } from "../../mock/data";
import { useMain } from "../../hooks/UseMain";

function EChartUser() {
  const { Title } = Typography;
  const { userStatisticsMonth, monthStatistics } = useDashboard();
  const {changeValue} = useMain()

  const eChart = {
    series: [
      {
        name: data[changeValue].dashboard.users_statistics_month,
        data: userStatisticsMonth
          ? userStatisticsMonth.map((total) => Number(total.user_count))
          : [],
        color: "#fff",
      },
      {
        name: data[changeValue].dashboard.payed_users_statistics_month,
        data: monthStatistics
          ? monthStatistics.map((total) => Number(total.user_count))
          : [],
        color: "#000",
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
        categories: userStatisticsMonth
          ? userStatisticsMonth.map((month, index) => index + 1)
          : [],

        labels: {
          show: true,
          align: "left",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "left",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return (
    <>
      <Title level={5}>{ data[changeValue].dashboard.users_statistics}</Title>

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

export default EChartUser;
