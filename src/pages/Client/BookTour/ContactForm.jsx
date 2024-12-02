import React, { useEffect, useState }  from 'react';
import { Form, Input, Button, Row, Col, Select, InputNumber,
    Divider, Typography,  
    Checkbox} from 'antd';
import { MinusOutlined, PlusOutlined, UserOutlined, MoneyCollectOutlined } from '@ant-design/icons';

const { Option } = Select;

function ContactForm () {
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(false); // Trạng thái checkbox
    const handleCheckboxChange = (e) => {
        setPaymentMethod(e.target.checked);
    };
    const { Title } = Typography;
    // Giả sử giá của người lớn và trẻ em (bạn có thể thay đổi theo dữ liệu thực tế)
    const priceAdult = 500000; // Giá của người lớn
    const priceChild = 300000; // Giá của trẻ em
    const handleAdultChange = (value) => {
        setAdultCount(value);
        calculateTotal(value, childCount);
    };

    const handleChildChange = (value) => {
        setChildCount(value);
        calculateTotal(adultCount, value);
    };

    const calculateTotal = (adults, children) => {
        const total = (adults * priceAdult) + (children * priceChild);
        setTotalPrice(total);
    };
    
    const AdultChange = () => {
        return (<Row gutter={8}>
            <Col span={8}>
                <Button
                    type="primary"
                    icon={<MinusOutlined />}
                    onClick={() => handleAdultChange(adultCount - 1)}
                    disabled={adultCount <= 0}
                />
            </Col>
            <Col span={8}>
                <InputNumber
                    min={0}
                    value={adultCount}
                    onChange={handleAdultChange}
                    style={{ width: '100%' }}
                />
            </Col>
            <Col span={8}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleAdultChange(adultCount + 1)}
                />
            </Col>
        </Row>)
    }
    
    const ChildChange = () =>{
        return (<Row gutter={8}>
            <Col span={8}>
                <Button
                    type="primary"
                    icon={<MinusOutlined />}
                    onClick={() => handleChildChange(childCount - 1)}
                    disabled={childCount <= 0}
                />
            </Col>
            <Col span={8}>
                <InputNumber
                    min={0}
                    value={childCount}
                    onChange={handleChildChange}
                    style={{ width: '100%' }}
                />
            </Col>
            <Col span={8}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleChildChange(childCount + 1)}
                />
            </Col>
        </Row>)
    }
    
    const ThanhToan = () => {
        return (
            <>
                <Title level={4} className="inf-title mt-4">Hình thức thanh toán</Title>
                <Form.Item>
                    <Checkbox
                        id="tien-mat"
                        checked={paymentMethod}
                        onChange={handleCheckboxChange}
                    >
                        <MoneyCollectOutlined style={{ marginLeft: 10 }} />
                        Tiền mặt
                    </Checkbox>
                </Form.Item>
            </>
        )
    }
    const Submit_Form = () => {
        return (
        <div className="customer-form">
            {/* Thông tin hành khách */}
            <div className="count-customer mt-2">
                <Title level={4} className="text-bold-color">Hành khách</Title>
                <div id="count-customer">
                  <span className="tour-title">
                    <UserOutlined/> {adultCount + childCount} người
                  </span>
                </div>
            </div>

            {/* Tổng tiền */}
            <div className="total mt-2">
                <Title level={5} className="tour-title">Tổng tiền</Title>
                <div id="total-price">
                    <span>{totalPrice.toLocaleString()} VND</span>
                </div>
            </div>

            {/* Nút Đặt tour */}
            <Button
                type="danger"
                style={{width: '100%'}}
                id="reserve"
                disabled={totalPrice === 0 || !paymentMethod} // Vô hiệu hóa nếu chưa chọn hình thức thanh toán}
            >
                Đặt tour
            </Button>
        </div>)
    };

    return (
        <div className="home-container">
            <Form layout="vertical" className="p-3 m-3">
                {/* Thông tin liên hệ */}
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <p className="inf-title">Thông tin liên hệ</p>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="Họ tên"
                            name="name"
                            rules={[{required: true, message: 'Vui lòng điền tên'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{required: true, message: 'Vui lòng điền số điện thoại'}]}
                        >
                            <InputNumber style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{required: true, message: 'Vui lòng điền email'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{required: true, message: 'Vui lòng điền địa chỉ'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Hành khách */}
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <p className="inf-title">Hành khách</p>
                    </Col>

                    {/* Người lớn */}
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item label="Người lớn (Từ 12)">
                            <AdultChange />
                        </Form.Item>
                    </Col>

                    {/* Trẻ em */}
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item label="Trẻ em (Dưới 12)">
                            <ChildChange/>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Thông tin hành khách */}
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <p className="inf-title">Thông tin hành khách</p>
                    </Col>

                    {/* Hành khách người lớn */}
                    <Col span={24}>
                        <div className="inf-customer cus-adult">
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item
                                        label="Họ tên"
                                        name="adult_name"
                                        rules={[{required: true, message: 'Vui lòng điền tên'}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item
                                        label="Ngày sinh"
                                        name="adult_birthday"
                                        rules={[{required: true, message: 'Vui lòng chọn ngày sinh'}]}
                                    >
                                        <Input type="date"/>
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Giới tính" name="adult_gender">
                                        <Select defaultValue="1">
                                            <Option value="1">Nam</Option>
                                            <Option value="2">Nữ</Option>
                                            <Option value="3">Khác</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                {/* Submit button */}
                <ThanhToan/>
                <Submit_Form/>
            </Form>
        </div>
    );
};

export default ContactForm;
