import { Button, Card, Col, Flex, Row, Space, Typography } from "antd";
import React from "react";

function Statistic() {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={9}>
                    <Card>
                        Có x đơn hàng chưa xử lý <Button>Đi đến xử lý</Button>
                    </Card>
                </Col>
                <Col xs={8} lg={5}>
                    <Card>
                        <Flex vertical align="center" justify="center">
                            <Space style={{ fontSize: 30, fontWeight: "bold" }}>Tour</Space>
                            <Space>
                                <Space>19</Space> +
                            </Space>
                        </Flex>
                    </Card>
                </Col>
                <Col xs={8} lg={5}>
                    <Card>Khách hàng</Card>
                </Col>
                <Col xs={8} lg={5}>
                    <Card>Đơn đặt</Card>
                </Col>

                <Col xs={24}>
                    <Card>Thống kê doanh thu</Card>
                </Col>

                <Col xs={24}>
                    <Card>Thống kê tour đặt nhiều</Card>
                </Col>

                <Col xs={24}>
                    <Card>Khách hàng đặt nhiều</Card>
                </Col>
            </Row>
        </>
    );
}

export default Statistic;