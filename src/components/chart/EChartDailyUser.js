import ReactApexChart from 'react-apexcharts';
import { Typography } from 'antd';
import useDashboard from '../../hooks/UseDashboard';
import { data } from '../../mock/data';
import { useMain } from '../../hooks/UseMain';

function EChartDailyUser() {
  const { Title } = Typography;
  const { userDailyTransactionData, dailyTransactionData } = useDashboard();
  const { changeValue } = useMain();

  const userData = userDailyTransactionData?.data || [];
  const transactionData = dailyTransactionData?.data || [];

  // 🧠 1. Create a date => value map for fast lookup
  const userMap = new Map(userData.map(item => [item.date, Number(item.user_count)]));
  const transactionMap = new Map(transactionData.map(item => [item.date, Number(item.total_checks)]));

  // 🗓️ 2. Find common dates and sort them
  const commonDates = [...userMap.keys()].filter(date => transactionMap.has(date)).sort();

  const eChart = {
    series: [
      {
        name: data[changeValue]?.dashboard?.users_statistics_month,
        data: commonDates.map(date => userMap.get(date)),
        color: '#fff',
      },
      {
        name: data[changeValue]?.dashboard?.payed_users_statistics_month,
        data: commonDates.map(date => transactionMap.get(date)),
        color: '#000',
      },
    ],
    options: {
      chart: {
        type: 'bar',
        width: '100%',
        height: 'auto',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['transparent'],
      },
      grid: {
        show: true,
        borderColor: '#ccc',
        strokeDashArray: 2,
      },
      xaxis: {
        categories: commonDates.map(date => date.slice(5)),
        labels: {
          show: true,
          style: {
            colors: Array(commonDates.length).fill('#fff'),
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: Array(10).fill('#fff'),
          },
        },
      },
      tooltip: {
        y: {
          formatter: val => val,
        },
      },
    },
  };

  return (
    <>
      <Title level={5}>User Daily</Title>
      {userData.length > 0 && transactionData.length > 0 ? (
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

export default EChartDailyUser;
