import React from 'react';
import { List, Typography, Button, Space, Divider, Card, Row, Col } from 'antd';
import { CalendarOutlined, PhoneOutlined, CreditCardOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const BookingDetails = (Booking) => {
  const data = [
    {
      title: 'Mã đặt chỗ',
      description: Booking.Id, //'241202DHI8TV',
      icon: <CreditCardOutlined />
    },
    {
      title: 'Ngày tạo',
      description: Booking.Time,    //'02/12/2024 14:05',
      icon: <CalendarOutlined />
    }
    // Thêm các cặp key-value nếu cần
  ];

  return (
    <Card bordered={false} style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Title level={3}>CHI TIẾT BOOKING</Title>

      {/* Danh sách thông tin chi tiết booking */}
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={item.icon}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />

      {/* Divider giúp phân tách phần thanh toán */}
      <Divider />

      {/* Thông tin về thanh toán */}
      <Row gutter={16}>
        <Col span={24}>
          <Text strong>Hình thức thanh toán: </Text>
          <Text type="secondary">Tiền mặt</Text>
        </Col>
        <Col span={24}>
          <Text>Quý khách vui lòng thanh toán tại bất kỳ văn phòng trên toàn quốc và các chi nhánh tại nước ngoài.</Text>
        </Col>
        <Col span={24}>
          <Space>
            <Button type="link" href="#" size="small">
              Xem chi tiết
            </Button>
            <Button type="primary" size="small">
              Thay đổi hình thức thanh toán
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default BookingDetails;
