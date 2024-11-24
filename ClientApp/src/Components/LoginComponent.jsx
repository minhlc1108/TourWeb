import axios from 'axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

const LoginComponent = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const handleLogin = async (values) => {
        const { username, password } = values;
        try {
            const response = await axios.post('https://localhost:7253/api/account/login', {
                username,
                password,
            });

            console.log("Response data:", response.data);

            if (response.data.adminRole) {
                message.success('Đăng nhập thành công! Bạn là quản trị viên.');
                navigate('/Dashboard');
            } else {
                message.success('Đăng nhập thành công!');
                navigate('/Home');
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                message.error('Tên người dùng hoặc mật khẩu không chính xác!');
            } else {
                message.error('Có lỗi xảy ra! Vui lòng thử lại sau.');
            }
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
                    <Input prefix={<UserOutlined />} placeholder="Username" />
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
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginComponent;
