import { useEffect, useRef, useState } from "react";
import {
  ConfigProvider,
  Dropdown,
  Flex,
  Layout,
  Menu,
  message,
  theme,
  Typography,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "~/store/authSlice";

const getItem = (label, key, children, type) => {
  return {
    key,
    children,
    label,
    type,
  };
};

const items = [
  getItem(<Link to={"/home"}>Home</Link>, "home"),
  getItem(<Link to={"/home"}>About</Link>, "About"),

  getItem(<Link to={"/tourClient"}>Tour</Link>, "Tour"),
  getItem(<Link to={"/home"}>Contact</Link>, "Contact"),
];

const TopNav = ({ ...others }) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [current, setCurrent] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("click ", e);
  };
  const {
    token: { borderRadius },
  } = theme.useToken();

  const itemsAccount = [
    {
      key: "user-profile-link",
      label: "Thông tin cá nhân",
      icon: <UserOutlined />,
      onClick: () => {
        navigate("/User/ThongTinCaNhan");
      },
    },
    user?.isAdmin && {
      key: "user-settings-link",
      label: "Trang quản trị",
      icon: <SettingOutlined />,
      onClick: () => {
        navigate("/admin");
      },
    },
    {
      key: "user-logout-link",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        dispatch(signOut());
        message.success("Đăng xuất thành công!");
      },
    },
  ];

  useEffect(() => {
    const paths = pathname.split("/");
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <div ref={nodeRef} breakpoint="lg" {...others}>
      <Link to={"/"} className="logo-link">
        <Flex gap={"small"} align="center" style={{ justifyContent: "center" }}>
          <img
            src="https://marketplace.canva.com/EAFvvrEdW20/1/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-TWAjs1N3SXo.jpg"
            alt="design sparx logo"
            height={48}
            width={48}
            style={{
              mixBlendMode: "hard-light",
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
          style={{ border: "none", width: "100%" }}
        />
      </ConfigProvider>
      {!user ? (
        <Link to={"/login"} className="logo-link">
          <Flex
            gap={"small"}
            align="center"
            style={{ justifyContent: "center" }}
          >
            Login
          </Flex>
        </Link>
      ) : (
        <Flex align="center" gap="small">
          <Dropdown menu={{ items: itemsAccount }} trigger={["click"]}>
            <Flex>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk8bD-grmaY0Y6_j5Adu1Bc6nY6OMyeF4QMw&s"
                alt="user profile photo"
                height={36}
                width={36}
                style={{ borderRadius, objectFit: "cover" }}
              />
            </Flex>
          </Dropdown>
        </Flex>
      )}
    </div>
  );
};

export default TopNav;
