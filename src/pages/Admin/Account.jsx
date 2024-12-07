import { useState, useEffect } from 'react';
import { Button, Space, Switch, message, Modal } from 'antd'; // Import Modal
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import AccountDetailsModal from "~/components/AccountModal/AccountModal";
import TableWithSearch from '~/components/TableWithSearch/TableWithSearch';

import {
    fetchAllAccountsAPI,
    updateAccountStatusAPI,
    deleteAccountAPI,
    fetchAccountDetailsAPI,
    deleteCustomerAPI,
    fetchCustomerDetailsAPI,
} from "~/apis";

import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    InfoCircleOutlined
} from "@ant-design/icons";

const Account = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [accountDetails, setAccountDetails] = useState(null);
    const [customerDetails, setCustomerDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const response = await fetchAllAccountsAPI();
            setData(response);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleEdit = (record) => {
        navigate(`/admin/account/edit/${record.id}?source=account`);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa tài khoản',
            content: `Bạn có chắc chắn muốn xóa tài khoản của ${record.userName}?`,
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await deleteCustomerAPI(record.id);
                    await deleteAccountAPI(record.id);
                    message.success('Đã xóa thành công!');
                    fetchAccounts();
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
            const accountResponse = await fetchAccountDetailsAPI(record.id);
            const customerResponse = await fetchCustomerDetailsAPI(record.id);

            setAccountDetails(accountResponse);
            setCustomerDetails(customerResponse);

            setIsModalVisible(true);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu tài khoản hoặc khách hàng:', error);
            message.error('Không thể tải dữ liệu tài khoản hoặc khách hàng!');
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (record) => {
        const updatedStatus = !record.lockoutEnabled;

        try {
            await updateAccountStatusAPI(record.id, updatedStatus);

            const updatedData = data.map((account) =>
                account.id === record.id ? { ...account, lockoutEnabled: updatedStatus } : account
            );
            setData(updatedData); 

            message.success('Cập nhật trạng thái thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu:', error.response?.data);
            message.error('Cập nhật trạng thái thất bại');
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setAccountDetails(null);
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
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            width: '20%',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
            width: '30%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '20%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'lockoutEnabled',
            key: 'lockoutEnabled',
            render: (_, record) => (
                <Switch checked={!record.lockoutEnabled} onChange={() => toggleStatus(record)} />
            ),
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
                        onClick={() => handleDelete(record)} // Gọi handleDelete với xác nhận
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
            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginBottom: '16px' }}
            >
                <Link to="/admin/account/create" state={{ source: 'account' }} style={{ color: 'white' }}>
                    Thêm
                </Link>
            </Button>

            <TableWithSearch fetchData={fetchAccounts} columns={columns} data={data} />

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

export default Account;
