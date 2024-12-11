import React, { useState, useEffect } from "react";
import { Card, Row, Col, Pagination, Flex } from "antd";
import { Button, Result } from 'antd';
import InforCardHorizone from "~/layouts/app/InforCardHorizone";
import { getCustomerByIdAPI ,
  updateCustomerAPI,
  getAccountByIdAPI,
  getCustomerByEmailAPI,

} from "~/apis";
import { Link } from "react-router-dom";

const ListBooking = () => {
  const [User, setUser] = useState([]); // Khởi tạo mảng rỗng
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Số lượng mục trên mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      // const result = await getCustomerByIdAPI("1");
      const customer = await getCustomerByEmailAPI ('abc@gmail.com')
      const tours = customer.bookings
      .map((booking) => {
        const tour = booking.tourSchedule?.tour;

        if (!tour) return null;
        return {
          id: booking.id,
          title: tour.name,
          description: `Điểm đến: ${tour.destination}`,
          time: `${tour.duration} ngày`,
          price: `Tổng tiền: ${booking.totalPrice} VND`, // Lấy từ booking thay vì tour
          images: tour.tourImages, // Sử dụng trường tourImages từ tour
        };
      })
      .filter(Boolean); // Loại bỏ null

    setUser(tours);
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
      <Row gutter={[16, 16]}
        style={{
          display:"flex",
         justifyContent: currentData.length === 0 ? 'center' : 'normal' 

          }
        }
      >
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <Col span={24} key={item.id}>
              <InforCardHorizone
                id = {item.id}
                title={item.title}
                description={item.description}
                image={item.images?.[0]?.url}
                price = {item.price}
                time = {item.time}
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
