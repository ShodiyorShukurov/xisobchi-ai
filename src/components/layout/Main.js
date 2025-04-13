  import React, { useState } from "react";
  import { useLocation } from "react-router-dom";
  import { Layout, Drawer, Affix } from "antd";
  import Sidenav from "./Sidenav";
  import Header from "./header/Header.js";
  import { useMain } from "../../hooks/UseMain";

  const { Header: AntHeader, Content, Sider } = Layout;

  function Main({ children }) {
    const { sidenavColor, setSidenavColor, } = useMain();

    const [isVisible, setIsVisible] = useState(false);

    const [sidenavType, setSidenavType] = useState("transparent");
    const [fixed, setFixed] = useState(false);

    const openDrawer = () => setIsVisible(!isVisible);
    const handleSidenavType = (type) => setSidenavType(type);
    const handleSidenavColor = (color) => setSidenavColor(color);
    const handleFixedNavbar = (type) => setFixed(type);

    let { pathname } = useLocation();
    pathname = pathname.replace("/", "");

    return (
      <Layout className={`layout-dashboard`}>
        <Drawer
          title={false}
          placement={"left"}
          closable={false}
          onClose={() => setIsVisible(false)}
          open={isVisible}
          key={"right"}
          width={250}
          className={`drawer-sidebar`}
        >
          <Layout className={`layout-dashboard`}>
            <Sider
              trigger={null}
              width={250}
              theme="light"
              className={`sider-primary ant-layout-sider-primary ${
                sidenavType === "#fff" ? "active-route" : ""
              }`}
              style={{ background: sidenavType }}
            >
              <Sidenav color={sidenavColor} />
            </Sider>
          </Layout>
        </Drawer>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          trigger={null}
          width={250}
          theme="light"
          className={`sider-primary ant-layout-sider-primary ${
            sidenavType === "#fff" ? "active-route" : ""
          }`}
          style={{ background: sidenavType }}
        >
          <Sidenav color={sidenavColor} />
        </Sider>
        <Layout>
          {fixed ? (
            <Affix>
              <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
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
          ) : (
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          )}
          <Content className="content-ant">{children}</Content>
        </Layout>
      </Layout>
    );
  }

  export default Main;
