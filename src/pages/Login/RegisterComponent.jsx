import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Select, DatePicker, message } from 'antd';
import { registerAPI } from '~/apis';

const { Option } = Select;
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
};


const RegisterComponent = ({ onRegisterSuccess }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (values) => {
        const formattedValues = {
            ...values,
            birthday: values.birthDate ? values.birthDate.format('YYYY-MM-DD') : null, 
            customerSex: parseInt(values.customerSex), 
        };

        setLoading(true);
        try {
            registerAPI(formattedValues);
            messageApi.success('Đăng ký thành công!');

            if (onRegisterSuccess) {
                onRegisterSuccess();
            }
            form.resetFields();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                messageApi.error(error.response.data.message);
            } else {
                messageApi.error('Đăng ký thất bại. Vui lòng thử lại!');
            }
        }
        finally {
            setLoading(false);
        }
    };



    const onFinish = (values) => {
        handleRegister(values);
    };

    return (
        <>
            {contextHolder}
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    padding: '20px',
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { min: 12, message: 'Mật khẩu phải có ít nhất 12 ký tự.' },
                        {
                            validator: (_, value) => {
                                if (!value) {
                                    return Promise.resolve();
                                }
                                const hasUpperCase = /[A-Z]/.test(value);
                                const hasLowerCase = /[a-z]/.test(value);
                                const hasNumber = /\d/.test(value);
                                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

                                if (!hasUpperCase) {
                                    return Promise.reject(new Error('Mật khẩu phải có ít nhất 1 chữ hoa.'));
                                }
                                if (!hasLowerCase) {
                                    return Promise.reject(new Error('Mật khẩu phải có ít nhất 1 chữ thường.'));
                                }
                                if (!hasNumber) {
                                    return Promise.reject(new Error('Mật khẩu phải có ít nhất 1 chữ số.'));
                                }
                                if (!hasSpecialChar) {
                                    return Promise.reject(new Error('Mật khẩu phải có ít nhất 1 ký tự đặc biệt.'));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Xác nhận mật khẩu"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    name="customerName"
                    label="Tên người dùng"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[{ type: 'email', message: 'E-mail không hợp lệ!' }, { required: true, message: 'Vui lòng nhập E-mail!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="SĐT"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }, { pattern: /^[0-9]+$/, message: 'SĐT chỉ chứa ký tự số!' }, { min: 10, message: 'Số điện thoại phải có ít nhất 10 chữ số!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="customerSex"
                    label="Giới tính"
                    rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                >
                    <Select placeholder="Chọn giới tính">
                        <Option value="0">Nam</Option>
                        <Option value="1">Nữ</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="customerAddress"
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                {/* Thêm trường Ngày sinh */}
                <Form.Item
                    name="birthDate"
                    label="Ngày sinh"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                >
                    <DatePicker placeholder="yyyy-mm-dd" format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterComponent;
