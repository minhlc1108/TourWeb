﻿import { useState, useEffect, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Switch, message } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

const Account = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('https://localhost:7253/api/account/listAccount');
            const dataWithKeys = response.data.map((item) => ({
                ...item,
                key: item.id, // Sử dụng id thực làm key
            }));
            setData(dataWithKeys);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const toggleStatus = async (record) => {
        const updatedStatus = !record.lockoutEnabled;

        try {
            // Sử dụng record.id để truyền ID
            await axios.put(`https://localhost:7253/api/account/updateStatus/${record.id}`, updatedStatus, {
                headers: { 'Content-Type': 'application/json' },
            });
            fetchAccounts();
            message.success('Status updated successfully!');
        } catch (error) {
            console.error('Error response data:', error.response?.data); // Thêm ? để tránh lỗi nếu không có response
            console.error('Error response status:', error.response?.status);
            console.error('Error response headers:', error.response?.headers);
            message.error('Failed to update status');
        }
    };




    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

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
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
            width: '30%',
            ...getColumnSearchProps('customerName'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'lockoutEnabled',
            key: 'lockoutEnabled',
            render: (_, record) => (
                <Switch
                    checked={!record.lockoutEnabled} 
                    onChange={() => toggleStatus(record)}
                />
            ),
        },
    ];

    return <Table columns={columns} rowKey="key" dataSource={data} />;
};

export default Account;
