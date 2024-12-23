﻿import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPasswordAPI } from '~/apis';

const ForgotPasswordComponent = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const handleForgotPassword = async (values) => {
        const { email } = values;

        try {
            await forgotPasswordAPI(email);
            message.success('Mật khẩu mới tạm thời đã được gửi, vui lòng kiểm tra email của bạn!');
            navigate('/login');
        } catch (error) {
            if (error.response) {
                console.log('Response error:', error.response.data);
            } else if (error.request) {
                message.error('Không thể kết nối tới server.');
            } else {
                message.error('Đã xảy ra lỗi không xác định.');
            }
        }
    };


    const onFinish = (values) => {
        handleForgotPassword(values);
    };

    return (
        <>
            {contextHolder}
            <Form
                name="forgot-password"
                onFinish={onFinish}
                style={{ maxWidth: 360 }}
                autoComplete="off"
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/login">Trở lại</Link>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Gửi yêu cầu
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default ForgotPasswordComponent;
