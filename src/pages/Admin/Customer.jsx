import { useState, useEffect } from 'react';
import { Button, Space, message, Modal } from 'antd';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import CreateAccount from './CreateAccount';
import EditAccount from './EditAccount';
import AccountDetailsModal from "~/components/AccountModal/AccountModal";
import TableWithSearch from '~/components/TableWithSearch/TableWithSearch';

import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    InfoCircleOutlined
} from "@ant-design/icons";

const Customer = () => {
    const [data, setData] = useState([]); 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [accountDetails, setAccountDetails] = useState(null);
    const [customerDetails, setCustomerDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://localhost:7253/api/customer/listCustomer');
            setData(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleEdit = (record) => {
        navigate(`/admin/customer/edit/${record.accountId}?source=customer`);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa tài khoản',
            content: `Bạn có chắc chắn muốn xóa tài khoản của ${record.name}?`,
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await axios.delete(`https://localhost:7253/api/customer/delete/${record.accountId}`);
                    await axios.delete(`https://localhost:7253/api/account/delete/${record.accountId}`);
                    message.success('Đã xóa thành công!');
                    fetchCustomers();
                } catch (error) {
                    console.error("Lỗi khi xóa tài khoản:", error);
                    message.error('Xóa tài khoản thất bại!');
                }
            },
        });
    };

    const handleView = async (record) => {
        setLoading(true);
        try {
            const accountResponse = await axios.get(`https://localhost:7253/api/account/${record.accountId}`);
            const accountData = accountResponse.data;

            const customerResponse = await axios.get(`https://localhost:7253/api/customer/${record.accountId}`);
            const customerData = customerResponse.data;

            setAccountDetails(accountData);
            setCustomerDetails(customerData);

            setIsModalVisible(true);
        } catch (error) {
            console.error('Error fetching account or customer data:', error);
            message.error('Không thể tải dữ liệu tài khoản hoặc khách hàng!');
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setCustomerDetails(null);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            key: 'sex',
            width: '20%',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            width: '20%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: '20%',
        },
        {
            title: 'SĐT',
            dataIndex: 'customerPhone',
            key: 'customerPhone',
            width: '20%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    ></Button>
                    <Button
                        type="default"
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(record)}
                    ></Button>
                    <Button
                        type="default"
                        icon={<InfoCircleOutlined />}
                        onClick={() => handleView(record)}
                    ></Button>
                </Space>
            ),
        },

    ];

    return (
        <>
            <Routes>
                <Route path="/admin/customer/create" element={<CreateAccount />} />
                <Route path="/admin/customer/edit/:id" element={<EditAccount />} />
            </Routes>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginBottom: '16px' }}
            >
                <Link to="/admin/customer/create" state={{ source: 'customer' }} style={{ color: 'white' }}>
                    Thêm
                </Link>
            </Button>
            <TableWithSearch fetchData={fetchCustomers} columns={columns} data={data} />
            <AccountDetailsModal
                isVisible={isModalVisible}
                loading={loading}
                accountDetails={accountDetails}
                customerDetails={customerDetails}
                onClose={handleModalClose}
            />
        </>
    );
};

export default Customer;
