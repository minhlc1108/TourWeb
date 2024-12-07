import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';
import RegisterForm from '../Login/RegisterComponent';

const CreateAccount = () => {
    const location = useLocation();
    const source = location.state?.source || 'account';
    const handleCreateAccount = (values) => {
        console.log('Form submitted:', values);
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                position: 'relative',
            }}
        >
            <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    color: '#1890ff',
                }}
            >
                <Link to={`/admin/${source}`} style={{ color: '#1890ff' }}>
                    Quay lại
                </Link>
            </Button>
            <div
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    padding: '20px',
                }}
            >
                <RegisterForm onFinish={handleCreateAccount} />
            </div>
        </div>
    );
};

export default CreateAccount;