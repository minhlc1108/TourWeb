import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
} from "antd";

import { message, modal } from "~/components/EscapeAntd";

import {
  updateCustomerAPI,
  getCustomerByEmailAPI,
  updateAccountAPI,


} from "~/apis";
import { useSelector } from "react-redux";

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
  const [form] = Form.useForm();

  // const user = {
  //   address: " ",
  //   birthday: "",
  //   email: "",
  //   id: 0,
  //   name: "fffffffffffff",
  //   phoneNumber: "",
  //   sex: 0,
  // };
  const [User, setUser] = useState({});
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchData = async () => {
      // const result = await getCustomerByIdAPI("1");
      // const Account = await getAccountByIdAPI("1");

      // console.log('acc',Account);

      const customer = await getCustomerByEmailAPI (user.email)

      console.log('cus',customer);

      // const formattedUser = {
      //   username : customer.username,
      //   id : customer.id,
      //   name : customer.name, 
      //   sex : customer.sex ,
      //   address: customer.address,
      //   phone : customer.phoneNumber,
        
      //   email : customer.email,
      //   // birthday: new Date(customer.birthday).toISOString().split('T')[0] // Định dạng lại ngày
      // };
      // const formattedUser = {
      //   name: Account.userName,
      //   email: Account.email,
      //   phoneNumber: Account.phoneNumber,
      // };
      // console.log ('check',formattedUser.phone )
      setUser(customer);
      form.setFieldsValue(customer);
    };
    fetchData();
  }, [form]);

    console.log("User", User);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        name: values.name,
        sex: values.sex,
        address: values.address,
      };

      const payloadAccount = {
        username: user.username,
        password : User.password,
        email : user.email,
        phoneNumber: values.phoneNumber,
        role: user.isAdmin ? "Admin" : "User",
      }

      // const payload = {
      //   ...User, // Dữ liệu cũ trong User
      //   ...values, // Dữ liệu mới từ form (userName, phoneNumber, etc.)
      // };
  
      console.log("Payload to update:", payload);
      console.log("id", User.id);
      console.log("Payload to payloadAccount:", payloadAccount);


      await updateCustomerAPI(User.id, values);
      message.success("Cập nhật thông tin thành công!", 3);
      setUser((prevUser) => ({
        ...prevUser,
        ...values,
      }));
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

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
        label="Họ và Tên"
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
        // disabled
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
        label="Số điện thoại "
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          // disabled
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        name="sex"
        label="Giới tính"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="Chọn giới tính">
          <Option value={1}>Nam</Option>
          <Option value={0}>Nữ</Option>
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
