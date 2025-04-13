import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import useDashboard from "../../hooks/UseDashboard";
import { data } from "../../mock/data";
import { useMain } from "../../hooks/UseMain";

function LineChart() {
  const { Title, Paragraph } = Typography;
  const { userStatisticsSource } = useDashboard();
  const { changeValue } = useMain();

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const dataBySource = {};

  userStatisticsSource?.forEach((entry) => {
    const monthIndex = new Date(entry.month.trim() + " 1, 2020").getMonth();
    const source = entry.source.trim();

    if (source !== "N/A") {
      const count = Number(entry.count);

      if (!dataBySource[source]) {
        dataBySource[source] = Array(12).fill(0);
      }

      dataBySource[source][monthIndex] = count;
    }
  });

  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A8",
    "#A833FF",
    "#33FFF1",
  ];
  const series = Object.keys(dataBySource).map((source, index) => ({
    name: source,
    data: dataBySource[source],
    color: colors[index % colors.length],
  }));

  const lineChart = {
    series: series,
    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: colors,
      legend: {
        show: true,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },
      xaxis: {
        categories: months,
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: Array(12).fill("#8c8c8c"),
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val} ${data[changeValue].dashboard.source_users}`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>
            {data[changeValue].dashboard.source_statistics}
          </Title>
          {/*<Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph>*/}
        </div>
        <div className="sales">
          <ul>
            {Object.keys(dataBySource).map((source, index) => (
              <li
                key={source}
                style={{
                  color: colors[index % colors.length],
                  textTransform: "capitalize",
                }}
              >
                {source}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
