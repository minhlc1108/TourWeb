import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Anchor,
  Typography,
  Avatar,
  Menu,
} from "antd";

import {
  UserOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  RocketOutlined,

} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  getCustomerByIdAPI
}from "~/apis";
import DetailsProfileUser from "./DetailsProfileUser";
import ChangePassword from "./ChangePassword";
import ListBooking from "./ListBooking";

const { Text, Link } = Typography;

const { Option } = Select;

const getItem = (label, key,  children, type) => {
  return {
    key,
    children,
    label,
    type,
  };
};

// const items = [
//   {
//     key: "sub1",
//     label: "Tài khoản",
//     icon: <UserOutlined />,
//     children: [
//       {
//         key: "g1",
//         label: "Thông tin cá nhân",
//         type: "group",
        
//       },
//       {
//         key: "g2",
//         label: "Đổi mật khẩu",
//         type: "group",
       
//       },
//     ],
//   },
//   {
//     key: "sub2",
//     label: "Đơn đặt chỗ",
//     icon: <RocketOutlined />,
//     children: [
//       {
//         key: "g1",
//         label: "Tất cả Booking",
//         type: "group",
        
//       },
//       {
//         key: "g2",
//         label: "Đặt thành công",
//         type: "group",
       
//       },
//       {
//         key: "g3",
//         label: "Đã Hủy",
//         type: "group",
       
//       },
//     ],
//   },
//   {
//     key: "sub3",
//     label: "Logout",
//     icon: <LogoutOutlined />,

    
//   },

// ];

const items = [

  {
    key: "sub1",
    label: <Link to="/User"> Tài Khoản</Link>,
    icon: <UserOutlined />,
    children: [
      {
        key: "/User/ThongTinCaNhan",
        label: <Link to="/User/ThongTinCaNhan">Thông tin cá nhân</Link>,
        path: "/User/ThongTinCaNhan",
      },
      {
        key: "/User/DoiMatKhau",
        label: <Link to="/User/DoiMatKhau">Đổi mật khẩu</Link>,
        path: "/User/DoiMatKhau",
      },
    ],
  },
  {
    key: "sub2",
    label: "Đơn đặt chỗ",
    icon: <RocketOutlined />,
    children: [
      {
        key: "/User/DanhSachTour",
        label: <Link to="/User/DanhSachTour">Tất cả Booking</Link>,
        path: "/User/DanhSachTour",
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const onChange = (link) => {
  console.log("Anchor:OnChange", link);
};

const ProfileUser = () => {

  const [User,setUser] = useState()
  const navigate = useNavigate();
  const location = useLocation();

  // Xác định menu đang được chọn
  const selectedKey = location.pathname;
  
  useEffect(()=> {
    const fetchData = async () => {
      const result = await getCustomerByIdAPI("22");
      // console.log(result);
      setUser ( result)
    }
    fetchData();
    }, []);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  
  // console.log(User)
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <Flex
    justify="center"
    align="center"
    
    >
    <Row gutter={[10, 0]} style={{ paddingTop: "2%" ,
    width:'100%'

    }}>
      <Col  flex="1 0 20%" 
      // xs={24} sm={6} md={5} lg={4}

        style={{
          height:'100vh'
          
        }}
       >
        <Flex
          vertical
          justify="center"
          align="center"
          style={{
            border: "2px solid rgba(5, 5, 5, 0.06)",
            background: "white",
            height: "100%",
          }}
        >
          <Flex
            align="center"
            justify="center"
            gap={"small"}
            style={{ borderBottom: "2px solid rgba(5, 5, 5, 0.06)" }}
          >
            <Avatar size="large" icon={<UserOutlined />} />
            <Flex
              vertical
              align="baseline"
              justify="center"
              // gap={'small'}
            >
              <Text>{User?.name}</Text>
              <Text>{User?.email}</Text>
            </Flex>
          </Flex>
          <Flex justify="left">
            <Menu
               selectedKeys={[selectedKey]} // Highlight menu item hiện tại
               onClick={({ key }) => navigate(key)} 
              style={{
                width: 256,
                borderRight: 'none'
              }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1","sub2"]}
              mode="inline"
              items={items}
            />
          </Flex>
        </Flex>
      </Col>
      <Col flex="3 0 75% " 
    // xs={24} sm={6} md={5} lg={4}
      >
        {/* <DetailsProfileUser/> */}
        {/* <ChangePassword/> */}
        {/* <ListBooking/> */}
        <Outlet/> 
      </Col>
    </Row>
    </Flex>
  );
};

export default ProfileUser;

{
  /* <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item> */
}
