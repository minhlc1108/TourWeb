import React, { useState } from "react";
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
import DetailsProfileUser from "./DetailsProfileUser";
import ChangePassword from "./ChangePassword";

const { Text, Link } = Typography;

const { Option } = Select;

const items = [
  {
    key: "sub1",
    label: "Tài khoản",
    icon: <UserOutlined />,
    children: [
      {
        key: "g1",
        label: "Thông tin cá nhân",
        type: "group",
        
      },
      {
        key: "g2",
        label: "Đổi mật khẩu",
        type: "group",
       
      },
    ],
  },
  {
    key: "sub2",
    label: "Đơn đặt chỗ",
    icon: <RocketOutlined />,
    children: [
      {
        key: "g1",
        label: "DS1",
        type: "group",
        
      },
      {
        key: "g2",
        label: "DS2",
        type: "group",
       
      },
    ],
  },
  {
    key: "sub3",
    label: "Logout",
    icon: <LogoutOutlined />,

    
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
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };


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
      <Col flex={5}>
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
              <Text>loz loc</Text>
              <Text>locancut123@gmail.com</Text>
            </Flex>
          </Flex>
          <Flex justify="left">
            <Menu
              // onClick={onClick}
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
      <Col flex={45}>
        <DetailsProfileUser/>
        {/* <ChangePassword/> */}
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
