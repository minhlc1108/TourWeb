import React from 'react';
import { Card, Row, Col, Image, Typography, Button, Space } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const BookingConfirmation = () => {
  return (
    <Card
      title="Phiếu xác nhận booking"
      bordered={false}
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: '20px',
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Thông tin Booking */}
        <Col xs={24} md={8}>
          <Image
            width={200}
            src="https://example.com/your-image.jpg" // Thay thế bằng đường dẫn hình ảnh của bạn
            alt="Booking Image"
            style={{ borderRadius: '8px', marginBottom: '16px' }}
          />
          <Text strong>Số booking:</Text> <Text>{'241202DHI8TV'}</Text>
          <br />
          <Text strong>Mã tour:</Text> <Text>{'NNSGN130-133-051224VJ-H'}</Text>
        </Col>

        {/* Thông tin chuyến bay */}
        <Col xs={24} md={16}>
          <Title level={4}>Thông tin chuyến bay</Title>
          <div style={{ marginBottom: '16px' }}>
            <Text strong>Ngày đi: </Text>
            <Text>{'05/12/2024 - VJ805 (17:15 SGN - 18:45 BKK)'}</Text>
            <br />
            <Text strong>Ngày về: </Text>
            <Text>{'09/12/2024 - VJ806 (19:55 BKK - 21:25 SGN)'}</Text>
          </div>
          <Image
            width={180}
            src="https://www.vietjetair.com/images/logo.png" // Logo hãng hàng không
            alt="Vietjet Logo"
            style={{ borderRadius: '8px', marginBottom: '16px' }}
          />
        </Col>
      </Row>

      {/* Thêm nút và biểu tượng */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Space size="middle">
          <Button type="primary" icon={<CheckCircleOutlined />}>
            Xác nhận booking
          </Button>
          <Button type="link" href="#" size="small">
            Xem chi tiết
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default BookingConfirmation;
