import { Layout, theme } from 'antd';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ReactLogo from '../assets/react.svg';
import LoginComponent from '../Components/LoginComponent';
import RegisterComponent from '../Components/RegisterComponent';
import ForgotPasswordComponent from '../Components/ForgotPasswordComponent'; // Đảm bảo đường dẫn đúng

const { Header, Content, Footer } = Layout;

const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

    const handleRegisterSuccess = () => {
        navigate('/login');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: colorBgContainer,
                    borderBottom: '1px #ccc solid',
                }}
            >
                <div className="demo-logo" style={{ display: 'flex' }}>
                    <img src={ReactLogo} alt="React Logo" style={{ height: '40px' }} />
                </div>
            </Header>
            <Content
                style={{
                    margin: '16px 8px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    flex: 1,
                }}
            >
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <>
                                <LoginComponent />
                                <Link to="/register">Chưa có tài khoản? Đăng ký ngay!</Link>
                            </>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <>
                                <RegisterComponent onRegisterSuccess={handleRegisterSuccess} />
                                <Link to="/login">Đã có tài khoản? Đăng nhập!</Link>
                            </>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPasswordComponent />}
                    />
                </Routes>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    background: colorBgContainer,
                }}
            >
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default App;
