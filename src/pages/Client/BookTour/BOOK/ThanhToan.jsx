import {Checkbox, Form, Typography} from "antd";
import {MoneyCollectOutlined} from "@ant-design/icons";
import React from "react";

const  ThanhToan = (handleCheckboxChange, paymentMethod) => {
    const { Title } = Typography;
    return (
        <>
            <Title level={4} className="inf-title mt-4">Hình thức thanh toán</Title>
            <Form.Item>
                <Checkbox
                    id="tien-mat"
                    // checked={paymentMethod}
                    // onChange={handleCheckboxChange}
                >
                    <MoneyCollectOutlined style={{ marginLeft: 10 }} />
                    Tiền mặt
                </Checkbox>
            </Form.Item>
        </>
    )
}

export default ThanhToan;