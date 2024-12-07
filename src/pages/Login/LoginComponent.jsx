import axios from 'axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Spin } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { loginAPI } from '~/apis';

const LoginComponent = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false); 
    const handleLogin = async (values) => {
        const { username, password } = values;
        setLoading(true);
        try {
            const response = await loginAPI(username, password);

            if (response) {
                console.log("Dữ liệu phản hồi:", response);

                if (response.token) {
                    localStorage.setItem('authToken', response.token);
                }

                if (response.isAdmin) {
                    message.success('Đăng nhập thành công! Bạn là quản trị viên.');
                    navigate('/admin');
                } else {
                    message.success('Đăng nhập thành công!');
                    navigate('/client');
                }
            } else {
                message.error('Không nhận được dữ liệu từ máy chủ!');
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data || 'Có lỗi xảy ra!';
                if (error.response.status === 401) {
                    message.error(errorMessage);
                } else if (error.response.status === 400) {
                    message.error('Tài khoản không hợp lệ!');
                } else {
                    message.error('Có lỗi xảy ra! Vui lòng thử lại sau.');
                }
            } else {
                message.error('Không thể kết nối đến máy chủ!');
            }
        } finally {
            setLoading(false);
        }
    };



    const onFinish = (values) => {
        handleLogin(values);
    };

    const onFinishFailed = (errorInfo) => {
        message.warning('Vui lòng kiểm tra lại thông tin đăng nhập!');
    };

    return (
        <>
            {contextHolder}
            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                style={{
                    maxWidth: 360
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên người dùng!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Tên người dùng" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={loading}>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginComponent;
