import {Card, Col, Form, Input, InputNumber, Row, Select} from "antd";
import React from "react";
import ThanhToan from "~/pages/Client/BookTour/BOOK/ThanhToan.jsx";

const Form_Name = ()=> {
    return (
        <Col xs={24} sm={12} md={8}>
            <Form.Item
                label="Họ tên"
                name="name"
                rules={[{required: true, message: 'Vui lòng điền tên'}]}
            >
                <Input/>
            </Form.Item>
        </Col>
    )
}

const Form_SDT = ()=> {
    return (
        <Col xs={24} sm={12} md={8}>
            <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{required: true, message: 'Vui lòng điền số điện thoại'}]}
            >
                <InputNumber style={{width: '100%'}}/>
            </Form.Item>
        </Col>
    )
}
const Form_Email = ()=> {
    return (
        <Col xs={24} sm={12} md={8}>
            <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, message: 'Vui lòng điền email'}]}
            >
                <Input/>
            </Form.Item>
        </Col>
    )
}
const Form_Address = ()=> {
    return (
        <Col xs={24} sm={12} md={8}>
            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{required: true, message: 'Vui lòng điền địa chỉ'}]}
            >
                <Input/>
            </Form.Item>
        </Col>
    )
}

const Form_Adult_Name = ()=> {
    return (
        <Col span={8}>
            <Form.Item
                label="Họ tên"
                name="adult_name"
                rules={[{required: true, message: 'Vui lòng điền tên'}]}
            >
                <Input/>
            </Form.Item>
        </Col>
    )
}

const Form_Adult_Birth = ()=> {
    return (
        <Col span={8}>
            <Form.Item
                label="Ngày sinh"
                name="adult_birthday"
                rules={[{required: true, message: 'Vui lòng chọn ngày sinh'}]}
            >
                <Input type="date"/>
            </Form.Item>
        </Col>
    )
}
const Form_Adult_GioiTinh = ()=> {
    return (
        <Col span={8}>
            <Form.Item label="Giới tính" name="adult_gender">
                <Select defaultValue="1">
                    <Option value="1">Nam</Option>
                    <Option value="2">Nữ</Option>
                    <Option value="3">Khác</Option>
                </Select>
            </Form.Item>
        </Col>
    )
}

function FormDataBooking({ AdultChange, ChildChange, handleCheckboxChange, paymentMethod }) {
    const renderFormRow = (title, children) => (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <p className="inf-title">{title}</p>
            </Col>
            {children}
        </Row>
    );

    const renderPassengerInfo = (label, Component) => (
        <Col xs={24} sm={12} md={8}>
            <Form.Item label={label}>
                <Component />
            </Form.Item>
        </Col>
    );

    return (
        <Card title="Thông tin khách hàng" bordered={false}>
            {/* Thông tin liên hệ */}
            {renderFormRow("Thông tin liên hệ", (
                <>
                    <Form_Name />
                    <Form_SDT />
                    <Form_Email />
                    <Form_Address />
                </>
            ))}

            {/* Hành khách */}
            {renderFormRow("Hành khách", (
                <>
                    {renderPassengerInfo("Người lớn (Từ 12)", AdultChange)}
                    {renderPassengerInfo("Trẻ em (Dưới 12)", ChildChange)}
                </>
            ))}

            {/* Thông tin hành khách */}
            {renderFormRow("Thông tin hành khách", (
                <Col span={24}>
                    <div className="inf-customer cus-adult">
                        <Row gutter={[16, 16]}>
                            <Form_Adult_Name />
                            <Form_Adult_Birth />
                            <Form_Adult_GioiTinh />
                        </Row>
                    </div>
                </Col>
            ))}

            {/* Submit button */}
            <ThanhToan handleCheckboxChange={handleCheckboxChange} paymentMethod={paymentMethod} />
        </Card>
    );
}

export default FormDataBooking;
