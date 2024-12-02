import React from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const PayMoney= () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    // Thêm thông báo khi gửi thành công
    message.success('Thông tin đã được gửi thành công!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    // Thêm thông báo khi gửi thất bại
    message.error('Vui lòng kiểm tra lại thông tin!');
  };

  return (
    <Form
      {...layout}
      name="contact-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* Trường Họ tên */}
      <Form.Item
        label="Họ tên"
        name="fullName"
        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
      >
        <Input />
      </Form.Item>

      {/* Trường Email */}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Vui lòng nhập email!' },
          { type: 'email', message: 'Vui lòng nhập đúng định dạng email!' },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Trường Số điện thoại */}
      <Form.Item
        label="Điện thoại"
        name="phone"
        rules={[
          { required: true, message: 'Vui lòng nhập số điện thoại!' },
          {
            pattern: /^[0-9]{10}$/,
            message: 'Số điện thoại phải gồm 10 chữ số!',
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      {/* Trường Địa chỉ */}
      <Form.Item label="Địa chỉ" name="address">
        <Input.TextArea />
      </Form.Item>

      {/* Trường Ghi chú */}
      <Form.Item label="Ghi chú" name="note">
        <Input.TextArea />
      </Form.Item>

      {/* Nút Submit */}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Gửi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PayMoney;
