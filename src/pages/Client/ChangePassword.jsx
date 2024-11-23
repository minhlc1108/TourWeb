import {React, useState , useEffect} from "react";
import { Form, Input, Button } from "antd";
import {
  getCustomerByIdAPI,
  updateCustomerAPI
}from "~/apis";
import { message, modal } from "~/components/EscapeAntd";

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

const ChangePassword = () => {
  const [form] = Form.useForm();

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
      // form.setFieldsValue(formattedUser)
    };
    fetchData();

  }, []);

  // console.log("check ben details", User.id);



  const handlePassword = async () => {
    if (form.getFieldValue())
    {
    

      if (form.getFieldValue("password") === User.password )
      {
        
        const formattedUser = {
          ...User,
          password: form.getFieldValue("newpassword")
        };
        // console.log("fomat",formattedUser)

        await updateCustomerAPI(User.id , formattedUser)
        message.success("Thành công", 3);
      }
      else {
        message.error("Password không chính xác");
      }
    }
    
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      labelAlign="left"
      size="large"
      style={{
        maxWidth: "100%",
        width: "100%",
        height:'100vh',
        border: "2px solid rgba(5, 5, 5, 0.06)",
        padding: "2%",
        background: "white",
        display:"flex",
        justifyContent:'center',
        flexDirection:'column',
        
      }}
      onFinish={handlePassword}

    >
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        // hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="newpassword"
        label="New Password"
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
        label="Confirm New Password"
        dependencies={["newpassword"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newpassword") === value) {
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

export default ChangePassword;
