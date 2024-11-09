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
  Space,
  DatePicker

} from "antd";

import {
  UserOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

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

const DetailsProfileUser = () => {
  const [form] = Form.useForm();

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="InformationUser"
      labelAlign="left"
      initialValues={{
        prefix: "86",
      }}
      size="large"
      style={{
        maxWidth: "100%",
        width: "100%",
        border: "2px solid rgba(5, 5, 5, 0.06)",
        padding: "2%",
        background: "white",
      }}
      scrollToFirstError
    >
      <Row gutter={[22, 22]}>
        <Col span={12}>
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
            <Input />
          </Form.Item>

          <Form.Item
            name="BirthDay"
            label="BirthDay"
            rules={[
              {
                required: true,
                message: "Please select your birth date!",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
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
            <Input />
          </Form.Item>

          <Form.Item name="address" label="Địa Chỉ">
            <Input />
          </Form.Item>

          <Form.Item label="Hộ Chiếu">
            <Space.Compact>
              <Form.Item
                name="dateRange"
                noStyle
                rules={[{ required: true, message: "Date is required" }]}
              >
                <RangePicker style={{ width: "65%" }} />
              </Form.Item>
              <Form.Item name="passport" noStyle>
                <Input style={{ width: "35%" }} placeholder="Số hộ chiếu" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="CMND"
            label="CMND/CCCD"
            rules={[
              {
                required: true,
                message: "Please input your CMND/CCCD!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="QuocTich"
            label="Quốc Tịch"
            rules={[
              {
                required: true,
                message: "Please input your nationality!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="CountBooking"
            label="Số Lần Booking"
            rules={[
              {
                required: true,
                message: "Please input your booking count!",
              },
            ]}
          >
            <Input defaultValue="1" disabled style={{ border: "none" }} />
          </Form.Item>

          <Form.Item
            name="phone"
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
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="Select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

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