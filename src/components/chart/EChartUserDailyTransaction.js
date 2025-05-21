import ReactApexChart from 'react-apexcharts';
import { Typography } from 'antd';
import { data } from '../../mock/data';
import { useMain } from '../../hooks/UseMain';
import useDashboard from '../../hooks/UseDashboard';

function EChartUserDailyTransaction() {
  const { Title } = Typography;
  const { dailyTransactionData } = useDashboard();
  const { changeValue } = useMain();

  const chartSeries = [
  {
    name: data[changeValue]?.dashboard?.payed_users_statistics_month || 'To‘langan foydalanuvchilar',
    data: Array.isArray(dailyTransactionData?.data)
      ? dailyTransactionData?.data?.sort((a, b) => new Date(a.date) - new Date(b.date)).map((item) =>
          isNaN(Number(item?.total_amount)) ? 0 : Number(item.total_amount)
        )
      : [],
    color: '#7F56D9',
  },
];

const eChart = {
  series: chartSeries,
  options: {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 600,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 10,
        distributed: false,
        colors: {
          ranges: [
            {
              from: 0,
              to: 1000000,
              color: '#00C9A7', 
            },
            {
              from: 1000001,
              to: 9999999,
              color: '#7F56D9', 
            },
            {
              from: 10000000,
              to: 99999999,
              color: '#FF6B6B',
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    grid: {
      show: true,
      borderColor: '#374151', // dark grey
      strokeDashArray: 4,
    },
    xaxis: {
      categories: dailyTransactionData?.data?.map((item) => item.date.slice(5)) ?? [],
      labels: {
        style: {
          colors: '#E5E7EB', // light grey
          fontSize: '12px',
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#E5E7EB',
          fontSize: '12px',
          fontWeight: 500,
        },
      },
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '13px',
      },
      y: {
        formatter: function (val) {
          return `${val.toLocaleString()} so'm`;
        },
      },
    },
  },
};


return (
  <>
    <Title level={5} style={{ color: '#000' }}>
      Transaction Daily
    </Title>

    {dailyTransactionData?.data?.length ? (
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
    ) : (
      <div style={{ color: 'black' }}>Ma'lumotlar yo'q yoki yuklanmoqda...</div>
    )}
  </>
);

}

export default EChartUserDailyTransaction;
