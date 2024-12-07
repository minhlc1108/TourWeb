import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, DatePicker } from 'antd';
import axios from 'axios';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchAccountDetailsAPI, fetchCustomerDetailsAPI, updateAccountAPI, updateCustomerAnAPI } from '~/apis';

const { Option } = Select;

const EditAccount = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const handleBack = () => {
        const source = searchParams.get('source') || 'account';
        if (source === 'customer') {
            navigate('/admin/customer');
        } else {
            navigate('/admin/account');
        }
    };

    useEffect(() => {
        const fetchAccount = async () => {
            setIsFetching(true);
            try {
                const accountResponse = await fetchAccountDetailsAPI(id);
                const accountData = accountResponse;

                const customerResponse = await fetchCustomerDetailsAPI(id);
                const customerData = customerResponse;
                console.log(accountData, customerData);
                form.setFieldsValue({
                    ...accountData,
                    ...customerData,
                    role: accountData.role ? "Admin" : "User",
                    dateOfBirth: customerData.birthday ? dayjs(customerData.birthday) : null,
                    customerSex: customerData?.sex?.toString()
                });

            } catch (error) {
                message.error('Không thể tải dữ liệu tài khoản hoặc khách hàng!');
            } finally {
                setIsFetching(false);
            }
        };

        fetchAccount();
    }, [id, form]);


    const handleUpdate = async (values) => {
        const accountData = {
            userName: values.userName,
            email: values.email,
            phoneNumber: values.phoneNumber, 
            role: values.role,
        };
        if (values.password) {
            accountData.password = values.password;
        }


        const customerData = {
            name: values.name,
            address: values.address,
            birthday: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : null,
            sex: parseInt(values.customerSex, 10),
        };

        setLoading(true);
        console.log('Account Data:', accountData);
        console.log('Customer Data:', customerData);
        try {
            await updateAccountAPI(id, accountData);
            await updateCustomerAnAPI(id, customerData);
            message.success('Cập nhật tài khoản thành công!');
            handleBack();
        } catch (error) {
            console.error('API Error:', error.response?.data || error.message);
            message.error('Cập nhật thất bại!');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
            style={{
                maxWidth: 800,
                margin: '0 auto',
                padding: '20px',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Chỉnh sửa tài khoản</h2>

            <Form.Item
                name="userName"
                label="Tên tài khoản"
                rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!', whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Mật khẩu mới"
                rules={[
                    { min: 12, message: 'Mật khẩu phải có ít nhất 12 ký tự.' },
                    {
                        validator: (_, value) => {
                            if (!value) {
                                return Promise.resolve();
                            }
                            const hasUpperCase = /[A-Z]/.test(value);
                            const hasLowerCase = /[a-z]/.test(value);
                            const hasNumber = /\d/.test(value);
                            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

                            if (!hasUpperCase) {
                                return Promise.reject(new Error('Mật khẩu phải có ít nhất 1 chữ hoa.'));
                            }
                            if (!hasLowerCase) {
                                return Promise.reject(new Error('Mật khẩu phải có ít nhất 1 chữ thường.'));
                            }
                            if (!hasNumber) {
                                return Promise.reject(new Error('Mật khẩu phải có ít nhất 1 chữ số.'));
                            }
                            if (!hasSpecialChar) {
                                return Promise.reject(new Error('Mật khẩu phải có ít nhất 1 ký tự đặc biệt.'));
                            }
                            return Promise.resolve();
                        },
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (getFieldValue('password') && value !== getFieldValue('password')) {
                                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Vui lòng nhập email hợp lệ!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="name"
                label="Tên khách hàng"
                rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="dateOfBirth"
                label="Ngày sinh"
                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
            >
                <DatePicker
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD"
                />
            </Form.Item>

            <Form.Item
                name="customerSex"
                label="Giới tính"
                rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
            >
                <Select placeholder="Chọn giới tính">
                    <Option value="0">Nam</Option>
                    <Option value="1">Nữ</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="role"
                label="Vai trò"
                rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
            >
                <Select placeholder="Chọn vai trò">
                    <Option value="Admin">Admin</Option>
                    <Option value="User">User</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={isFetching || loading}
                >
                    Cập nhật
                </Button>

                <Button
                    style={{ marginLeft: '10px' }}
                    onClick={handleBack}
                >
                    Quay lại
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditAccount;
