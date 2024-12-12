import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { message } from '~/components/EscapeAntd';
import { loginAPI } from '~/apis';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from "~/store/authSlice";  // Import action login
const LoginComponent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogin = async (values) => {
        try {
            setLoading(true);  // Bắt đầu quá trình đăng nhập
            const response = await dispatch(signIn(values));  // Gọi action login
            if (response.type === "auth/login/fulfilled") {
              // Nếu đăng nhập thành công, chuyển hướng đến trang khác
              navigate("/");  // Thay "/dashboard" bằng route bạn muốn
            }
          } catch (error) {
            message.error("Đăng nhập không thành công!");
          } finally {
            setLoading(false);  // Kết thúc quá trình đăng nhập
          }
    };



    const onFinish = (values) => {
        handleLogin(values);
    };

    const onFinishFailed = (errorInfo) => {
        message.warning('Vui lòng kiểm tra lại thông tin đăng nhập!');
    };

    if(user){
        return <Navigate to={"/"}></Navigate>
    }

    return (
        <>
        
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
