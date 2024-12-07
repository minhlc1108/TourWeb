import { useEffect, useRef, useState } from "react";
import { ConfigProvider, Flex, Layout, Menu, Typography } from "antd";
import {
  BarChartOutlined,
  CalendarOutlined,
  CarOutlined,
  CompassOutlined,
  FolderOpenOutlined,
  GiftOutlined,
  UserOutlined, 
  KeyOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const items = [
  getItem(
    <Link to={"/admin/statistic"}>Thống kê</Link>,
    "statistic",
    <BarChartOutlined />
  ),
  getItem(<Link to={"/admin/tour"}>Tour</Link>, "tour", <CompassOutlined />),
  getItem(
    <Link to={"/admin/promotion"}>Khuyến mãi</Link>,
    "promotion",
    <GiftOutlined />
  ),
  getItem(
    <Link to={"/admin/category"}>Danh mục</Link>,
    "category",
    <FolderOpenOutlined />
  ),
  getItem(
    <Link to={"/admin/transport"}>Phương tiện</Link>,
    "transport",
    <CarOutlined />
  ),
  getItem(
    <Link to={"/admin/booking"}>Đặt chỗ</Link>,
    "booking",
    <CalendarOutlined />
  ),
  getItem(
    <Link to={"/admin/customer"}>Khách hàng</Link>,
    "customer",
    <UserOutlined />
  ),
  getItem(
    <Link to={"/admin/account"}>Tài khoản</Link>,
    "account",
    <KeyOutlined />
  ),
];

const SideNav = ({ ...others }) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const paths = pathname.split("/");
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Link to={"/admin"} className="logo-link">
        <Flex
          gap={"small"}
          align="center"
          style={{ padding: "1rem 0", justifyContent: "center" }}
        >
          <img
            src="https://marketplace.canva.com/EAFvvrEdW20/1/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-TWAjs1N3SXo.jpg"
            alt="design sparx logo"
            height={48}
            width={48}
          />
          <Typography.Title
            level={5}
            type="secondary"
            style={{
              margin: 0,
              padding: `4px 8px`,
            }}
          >
            Admin Travel
          </Typography.Title>
        </Flex>
      </Link>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "none",
              itemSelectedBg: "#b0d2ff",
              itemSelectedColor: "#0062b3",
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          selectedKeys={[current]}
          style={{ border: "none" }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
