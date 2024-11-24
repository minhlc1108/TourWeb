import React, { useState, useEffect } from "react";
import { Card, Row, Col, Pagination } from "antd";
import { Button, Result } from 'antd';
import InforCardHorizone from "~/layouts/app/InforCardHorizone";
import { getCustomerByIdAPI } from "~/apis";

const ListBooking = () => {
  const [User, setUser] = useState([]); // Khởi tạo mảng rỗng
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Số lượng mục trên mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCustomerByIdAPI("20");

      const tours = result.bookings.map((booking) => {
        const tour = booking.tourSchedule?.tour;
        if (tour) {
          return {
            id: tour.id,
            title: tour.name,
            description: `Điểm đến: ${tour.destination}, Thời gian: ${tour.duration} ngày`,
            detail : tour.detail ,
            images: tour.images,
          };
        }
        return null;
      });

      setUser(tours.filter((tour) => tour !== null));
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = User.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Card
      title="Tất cả"
      style={{
        height: "100vh",
      }}
    >
      <Row gutter={[16, 16]}>
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <Col span={24} key={item.id}>
              <InforCardHorizone
                title={item.title}
                description={item.description}
                image={item.images?.[0]?.url}
                detail = {item.detail}
              />
            </Col>
          ))
        ) : (
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={<Button type="primary">Back Home</Button>}
          />
        )}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={User.length}
        onChange={handlePageChange}
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      />
    </Card>
  );
};

export default ListBooking;
