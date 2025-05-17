import { Card, Col, Row, Typography } from 'antd';

import EChartTransaction from '../../components/chart/EChartTransaction';
import LineChart from '../../components/chart/LineChart';
import Main from '../../components/layout/Main';
import useDashboard from '../../hooks/UseDashboard';
import EChartUser from '../../components/chart/EChartUser';
import { useMain } from '../../hooks/UseMain';
import { data } from '../../mock/data';

const dollor = [
  <svg
    width="22"
    height="22"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
      fill="#fff"
    ></path>
    <path
      d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
      fill="#fff"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
      fill="#fff"
    ></path>
  </svg>,
];

const profile = [
  <svg
    width="22"
    height="22"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
      fill="#fff"
    ></path>
    <path
      d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
      fill="#fff"
    ></path>
    <path
      d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
      fill="#fff"
    ></path>
    <path
      d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
      fill="#fff"
    ></path>
  </svg>,
];

function Home() {
  const { Title } = Typography;

  const { userStatistics, totalAmount, isLoading } = useDashboard();
  const { sidenavColor, changeValue } = useMain();

  const formatAmount = (amount) => {
    const sum = amount;
    if (sum >= 1000000) {
      return (sum / 1000000).toFixed(3) + 'm';
    } else if (sum >= 1000) {
      return (sum / 1000).toFixed(1) + 'k';
    } else {
      return sum + ' Sum';
    }
  };

  const count = [
    {
      today: data[changeValue]?.dashboard?.payed_users,
      title: userStatistics?.payed_user,
      icon: profile,
      bnb: 'bnb2',
    },
    {
      today: data[changeValue]?.dashboard?.bot_users,
      title: userStatistics?.all_user,
      icon: profile,
      bnb: 'bnb2',
    },
    {
      today:
        data[changeValue]?.dashboard?.sales + ` (${data[changeValue]?.sum})`,
      title: formatAmount(totalAmount?.sum),
      // persent: "+30%",
      icon: dollor,
      bnb: 'bnb2',
    },

    {
      today: 'Bot Lang (UZ)',
      title:
        Array.isArray(userStatistics?.bot_lang) &&
        userStatistics.bot_lang.length > 0
          ? userStatistics.bot_lang[0].user_count
          : 0,
      // persent: "+30%",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 512 512.001"
        >
          <g fillRule="nonzero">
            <path
              fill="#4D4D4D"
              d="M256 0c70.684 0 134.69 28.664 181.013 74.988C483.337 121.311 512 185.317 512 256c0 70.684-28.663 134.69-74.987 181.013C390.69 483.337 326.684 512 256 512c-70.676 0-134.689-28.663-181.013-74.987C28.664 390.69 0 326.677 0 256c0-70.683 28.664-134.689 74.987-181.012C121.311 28.664 185.317 0 256 0z"
            />
            <path
              fill="#fff"
              d="M256.002 19.597c65.277 0 124.382 26.466 167.162 69.242 42.776 42.78 69.243 101.885 69.243 167.163 0 65.277-26.467 124.382-69.246 167.159-42.777 42.779-101.882 69.245-167.159 69.245-65.278 0-124.383-26.466-167.163-69.242-42.776-42.78-69.242-101.885-69.242-167.162 0-65.278 26.466-124.383 69.242-167.163 42.78-42.776 101.885-69.242 167.163-69.242z"
            />
            <path
              fill="#1EB53A"
              d="M56.259 339.402h399.485c-32.654 78.114-109.785 133.007-199.742 133.007-89.961 0-167.089-54.893-199.743-133.007z"
            />
            <path
              fill="#0099B5"
              d="M467.021 207.831H44.982C66.878 111.5 153.04 39.595 256.002 39.595c102.958 0 189.12 71.905 211.019 168.236z"
            />
            <path
              fill="#CE1126"
              d="M452.092 347.627H59.909a213.038 213.038 0 01-3.65-8.225h399.485a214.621 214.621 0 01-3.652 8.225zM47.034 199.61h417.935a217.374 217.374 0 012.052 8.221H44.982c.629-2.763 1.32-5.5 2.052-8.221z"
            />
            <path
              fill="#fff"
              d="M179.048 85.172a49.509 49.509 0 00-8.222-.685c-27.25 0-49.338 22.091-49.338 49.338 0 27.249 22.088 49.338 49.338 49.338 2.802 0 5.548-.235 8.222-.685-23.336-3.914-41.114-24.206-41.114-48.653 0-24.445 17.778-44.739 41.114-48.653zM281.587 91.305l-2.217-6.818-2.215 6.818h-7.17l5.801 4.217-2.215 6.816 5.799-4.213 5.801 4.213-2.217-6.819 5.801-4.214zM281.587 130.777l-2.217-6.819-2.215 6.819h-7.17l5.801 4.216-2.215 6.816 5.799-4.214 5.801 4.214-2.217-6.819 5.801-4.213zM242.118 130.777l-2.217-6.819-2.215 6.819h-7.17l5.801 4.216-2.215 6.816 5.799-4.214 5.801 4.214-2.217-6.819 5.801-4.213zM321.059 170.248l-2.218-6.819-2.215 6.819h-7.17l5.801 4.215-2.215 6.817 5.799-4.214 5.801 4.214-2.217-6.818 5.801-4.214zM281.587 170.248l-2.217-6.819-2.215 6.819h-7.17l5.801 4.215-2.215 6.817 5.799-4.214 5.801 4.214-2.217-6.818 5.801-4.214zM321.059 91.305l-2.218-6.818-2.215 6.818h-7.17l5.801 4.217-2.215 6.816 5.799-4.213 5.801 4.213-2.217-6.819 5.801-4.214zM321.059 130.777l-2.218-6.819-2.215 6.819h-7.17l5.801 4.216-2.215 6.816 5.799-4.214 5.801 4.214-2.217-6.819 5.801-4.213zM360.53 91.305l-2.218-6.818-2.215 6.818h-7.17l5.801 4.217-2.215 6.816 5.799-4.213 5.801 4.213-2.217-6.819 5.802-4.214zM360.53 130.777l-2.218-6.819-2.215 6.819h-7.17l5.801 4.216-2.215 6.816 5.799-4.214 5.801 4.214-2.217-6.819 5.802-4.213zM202.647 170.248l-2.217-6.819-2.215 6.819h-7.17l5.801 4.215-2.215 6.817 5.799-4.214 5.801 4.214-2.217-6.818 5.801-4.214zM242.118 170.248l-2.217-6.819-2.215 6.819h-7.17l5.801 4.215-2.215 6.817 5.799-4.214 5.801 4.214-2.217-6.818 5.801-4.214zM360.53 170.248l-2.218-6.819-2.215 6.819h-7.17l5.801 4.215-2.215 6.817 5.799-4.214 5.801 4.214-2.217-6.818 5.802-4.214z"
            />
          </g>
        </svg>
      ),
      bnb: 'bnb2',
    },
    {
      today: 'Bot Lang (RU)',
      title:
        Array.isArray(userStatistics?.bot_lang) &&
        userStatistics.bot_lang.length > 0
          ? userStatistics.bot_lang[1].user_count
          : 0,
      // persent: "+30%",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 512 512"
        >
          <g fill-rule="nonzero">
            <path
              fill="#4D4D4D"
              d="M256 0c70.684 0 134.689 28.664 181.012 74.987C483.336 121.311 512 185.316 512 256c0 70.684-28.664 134.689-74.988 181.013C390.689 483.336 326.684 512 256 512c-70.677 0-134.689-28.664-181.013-74.987C28.664 390.689 0 326.676 0 256c0-70.684 28.664-134.689 74.987-181.013C121.311 28.664 185.316 0 256 0z"
            />
            <path
              fill="#fff"
              d="M256.001 19.597c65.278 0 124.382 26.466 167.162 69.242 42.776 42.78 69.242 101.884 69.242 167.162S465.939 380.384 423.16 423.16c-42.777 42.78-101.881 69.246-167.159 69.246-65.278 0-124.382-26.466-167.162-69.243-42.777-42.779-69.243-101.884-69.243-167.162S46.062 131.619 88.839 88.839c42.78-42.776 101.884-69.242 167.162-69.242z"
            />
            <path
              fill="#fff"
              d="M472.405 256.232H39.597l-.003-.231c0-119.52 96.886-216.407 216.407-216.407 119.517 0 216.407 96.887 216.407 216.407l-.003.231z"
            />
            <path
              fill="#D52B1E"
              d="M39.597 256.232h432.808c-.124 119.411-96.963 216.176-216.404 216.176-119.444 0-216.28-96.765-216.404-216.176z"
            />
            <path
              fill="#0039A6"
              d="M52.038 183.55h407.926c8.048 22.652 12.444 47.036 12.444 72.451 0 25.586-4.452 50.131-12.606 72.915H52.2c-8.154-22.784-12.606-47.329-12.606-72.915 0-25.415 4.396-49.799 12.444-72.451z"
            />
          </g>
        </svg>
      ),
      bnb: 'bnb2',
    },
     {
      today: 'Start',
      title:
        Array.isArray(userStatistics?.bot_lang) &&
        userStatistics.bot_lang.length > 0
          ? userStatistics.bot_lang[2].user_count
          : 0,
      // persent: "+30%",

      bnb: 'bnb2',
    },
  ];

  if (isLoading) {
    return <Main>{data[changeValue]?.loading}</Main>;
  }

  return (
    <Main>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div
                        className={`${
                          c.today == 'Bot Lang (UZ)' ||
                          c.today == 'Bot Lang (RU)'
                            ? ''
                            : 'icon-box'
                        } `}
                        style={{
                          width: c.today === 'Bot Lang (UZ)' || c.today === 'Bot Lang (RU)' && '48px',
                          height: c.today === 'Bot Lang (UZ)' || c.today === 'Bot Lang (RU)' && '48px',
                        }}
                      >
                        {c.icon}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <EChartTransaction />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <EChartUser />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
}

export default Home;
