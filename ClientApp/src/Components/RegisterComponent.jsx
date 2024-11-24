import axios from 'axios';
import { Button, Form, Input, Select, message } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};
const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
};

const RegisterComponent = ({ onRegisterSuccess }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const handleRegister = async (values) => {
        const { username, password, email, phone, customerName, customerSex, customerAddress } = values;
        try {
            const response = await axios.post('https://localhost:7253/api/account/register', {
                username,
                password,
                email,
                phone,
                customerName,
                customerSex: parseInt(customerSex),
                customerAddress,
            });
            messageApi.success('Đăng ký thành công!');
            onRegisterSuccess();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                messageApi.error(error.response.data.message);
            } else {
                messageApi.error('Đăng ký thất bại. Vui lòng thử lại!');
            }
        }
    };

    const onFinish = (values) => {
        handleRegister(values);
    };

    return (
        <>
            {contextHolder}
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự.' },
                        {
                            validator(_, value) {
                                if (!value || /[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu cần ít nhất một ký tự đặc biệt!'));
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
                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="customerName"
                    label="Tên người dùng"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        { type: 'email', message: 'E-mail không hợp lệ!' },
                        { required: true, message: 'Vui lòng nhập E-mail!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="SĐT"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                        { pattern: /^[0-9]+$/, message: 'SĐT chỉ chứa ký tự số!' },
                        { min: 10, message: 'Số điện thoại phải có ít nhất 10 chữ số!' },
                    ]}
                >
                    <Input />
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
                    name="customerAddress"
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

RegisterComponent.propTypes = {
    onRegisterSuccess: PropTypes.func.isRequired,
};

export default RegisterComponent;
