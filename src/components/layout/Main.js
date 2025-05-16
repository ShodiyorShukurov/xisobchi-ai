import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Drawer, Affix, Button } from 'antd';
import Sidenav from './Sidenav';
import Header from './header/Header.js';
import { useMain } from '../../hooks/UseMain';
import { API_TOKEN } from '../../utils/constants.js';

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const { sidenavColor, setSidenavColor } = useMain();

  const [isVisible, setIsVisible] = useState(false);

  const [sidenavType, setSidenavType] = useState('transparent');
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setIsVisible(!isVisible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');

  const logOut = () => {
    localStorage.clear(API_TOKEN);
    window.location.href = '/login';
  };

  return (
    <Layout className={`layout-dashboard`}>
      <Drawer
        title={false}
        placement={'left'}
        closable={false}
        onClose={() => setIsVisible(false)}
        open={isVisible}
        key={'right'}
        width={300}
      >
        <Layout className={`layout-dashboard`}>
          <Sider
            trigger={'null'}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === '#fff' ? 'active-route' : ''
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav color={sidenavColor} />
            <Button
          type="link"
          style={{
            position: 'absolute',
            bottom: 50,
            right: 0,
          }}
          onClick={() => logOut()}
        >
          <svg
            width={24}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M14 4.75A2.75 2.75 0 0 0 11.25 2h-3A2.75 2.75 0 0 0 5.5 4.75v.5a.75.75 0 0 0 1.5 0v-.5c0-.69.56-1.25 1.25-1.25h3c.69 0 1.25.56 1.25 1.25v6.5c0 .69-.56 1.25-1.25 1.25h-3c-.69 0-1.25-.56-1.25-1.25v-.5a.75.75 0 0 0-1.5 0v.5A2.75 2.75 0 0 0 8.25 14h3A2.75 2.75 0 0 0 14 11.25v-6.5Zm-9.47.47a.75.75 0 0 0-1.06 0L1.22 7.47a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-.97-.97h7.19a.75.75 0 0 0 0-1.5H3.56l.97-.97a.75.75 0 0 0 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
          Log out
        </Button>
          </Sider>
        </Layout>
      </Drawer>
          <Affix>
            <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        <Content  className="content-ant">{children}</Content>
    </Layout>
  );
}

export default Main;
