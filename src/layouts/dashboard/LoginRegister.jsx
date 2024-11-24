import { Layout, theme } from 'antd';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from "~/pages/Login/LoginComponent";
import Register from "~/pages/Login/RegisterComponent";
import ForgotPassword from "~/pages/Login/ForgotPasswordComponent";
import HeaderNav from "../app/HeaderNav";

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
            <HeaderNav
                style={{
                    padding: "0 2rem 0 0",
                    background: "rgba(255, 255, 255, .5)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 0 8px 2px rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    gap: 8,
                    transition: "all .25s"
                }}
            >
            </HeaderNav>
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
                                <Login />
                                <Link to="/register">Chưa có tài khoản? Đăng ký ngay!</Link>
                            </>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <>
                                <Register onRegisterSuccess={handleRegisterSuccess} />
                                <Link to="/login">Đã có tài khoản? Đăng nhập!</Link>
                            </>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
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
