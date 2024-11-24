import React from 'react';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Routes, Route } from 'react-router-dom';
import AccountManagerComponent from '../Components/AccountManagerComponent';
import CustomerManagerComponent from '../Components/CustomerManagerComponent';

const { Header, Content, Sider } = Layout;
const SlideItem = [
    { label: "Quản lý tài khoản", path: "/Dashboard/account-manager" },
    { label: "Quản lý khách hàng", path: "/Dashboard/customer-manager" }
];
const SlideMenu = [UserOutlined, LaptopOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: <Link to={SlideItem[index].path}>{SlideItem[index].label}</Link>,
    };
});
const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                
            </Header>
            <Layout>
                <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={SlideMenu}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            marginTop: 32,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Routes>
                            <Route path="account-manager" element={<AccountManagerComponent />} />
                            <Route path="customer-manager" element={<CustomerManagerComponent />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default App;