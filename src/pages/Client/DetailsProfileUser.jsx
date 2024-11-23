import React, { useState, useEffect } from "react";
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
  Space,
  DatePicker,
} from "antd";

import { message, modal } from "~/components/EscapeAntd";


import {
  UserOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { getCustomerByIdAPI,
  updateCustomerAPI,
 } from "~/apis";
import { useForm } from "antd/es/form/Form";

const { RangePicker } = DatePicker;

const { Text, Link } = Typography;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 26,
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



const DetailsProfileUser = () => {
  const [form] = Form.useForm(
    
  );
  const user = {
    address: " ",
    birthday: "",
    email: "",
    id: 0,
    name: "fffffffffffff",
    phoneNumber: "",
    sex: 0,
  };
  const [User, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCustomerByIdAPI("20");
      // console.log(result);
      const formattedUser = {
        ...result,
        birthday: new Date(result.birthday).toISOString().split('T')[0] // Định dạng lại ngày
      };
      setUser(formattedUser);
      form.setFieldsValue(formattedUser)
      // setName(result.name)
    };
    fetchData();
    // console.log("check ben details", User);
  }, []);
  console.log("check ben details", User);
  console.log("Form", form.getFieldsValue());



  const handleSubmit = async (values ) => {
    if(form.getFieldsValue())
    {
      await updateCustomerAPI(User.id , values)
      message.success("Thành công", 3);
    }
  }

  return (
    
    <Form
      {...formItemLayout}
      form={form}
      name="InformationUser"
      labelAlign="left"
     
      size="large"
      style={{
        maxWidth: "100%",
        width: "100%",
        height: "100vh",
        border: "2px solid rgba(5, 5, 5, 0.06)",
        padding: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "white",
      }}

      onFinish={handleSubmit}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            type: "string",
            message: "The input is not valid!",
          },
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input
          disabled
         />
      </Form.Item>

      <Form.Item
        name="birthday"
        label="Birthday"
        rules={[
          {
            required: true,
            message: "Please select your birth date!",
          },
        ]}
      >
        {/* <DatePicker
        
        value={new Date("2003-11-01")} 
        style={{ width: "100%" }} /> */}
        <Input
        type="date"
        />
      </Form.Item>
      <Form.Item name="address" label="Địa Chỉ">
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input 
          disabled
        
        />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="sex"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="Select your gender">
          
          <Option value={1}>Male</Option>
          <Option value={2}>Female</Option>
          <Option value={0}>Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        {...tailFormItemLayout}
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "0",
        }}
      >
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DetailsProfileUser;
