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
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";



const getItem = (label, key,  children, type) => {
  return {
    key,
    children,
    label,
    type,
  };
};

const items = [
  getItem(
    <Link to={"/home"}>Home</Link>,
    "home",
  ),
  getItem(
    <Link to={"/home"}>About</Link>,
    "About",
  ),
 
  getItem(
    <Link to={"/tourClient"}>Tour</Link>,
    "Tour",
  ),
  getItem(
    <Link to={"/home"}>Contact</Link>,
    "Contact",
  ),

 
];

const TopNav = ({ ...others }) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
  };

  useEffect(() => {
    const paths = pathname.split("/");
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <div ref={nodeRef} breakpoint="lg"  {...others}
    
    >
      <Link to={"/client/home"} className="logo-link">
          <Flex
          gap={"small"}
          align="center"
          style={{ justifyContent: "center" }}
          >
          <img
            src="https://marketplace.canva.com/EAFvvrEdW20/1/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-TWAjs1N3SXo.jpg"
            alt="design sparx logo"
            height={48}
            width={48}
            style={{
                mixBlendMode: 'hard-light',
            }}
          />
        </Flex>
      </Link>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "none",
              itemSelectedBg: "black",
              itemSelectedColor: "white",
            },
          },
        }}
      >
        <Menu
          mode="horizontal"
          items={items}
          onClick={onClick}
          selectedKeys={[current]}
          style={{ border: "none",width:'100%' }}
        />
      </ConfigProvider>
      <Link to={"/client/home"} className="logo-link">
          <Flex
          gap={"small"}
          align="center"
          style={{ justifyContent: "center" }}
          >
          Login 
        </Flex>
      </Link>
      
    </div>
  );
};

export default TopNav;
