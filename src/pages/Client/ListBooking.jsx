import React, { useState, useEffect } from "react";
import { Card, Row, Col, Pagination } from "antd";
import InforCardHorizone from "~/layouts/app/InforCardHorizone";
import {
  getCustomerByIdAPI,
  updateCustomerAPI,
  
}from "~/apis";

const ListBooking = () => {

  const [User, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCustomerByIdAPI("20");
      // console.log(result);
      const formattedUser = {
        ...result,
        birthday: new Date(result.birthday).toISOString().split('T')[0] // Định dạng lại ngày
      };
      setUser(formattedUser);
      // form.setFieldsValue(formattedUser)
    };
    fetchData();

  }, []);

  const data = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Booking ${i + 1}`,
    description: `This is description for booking ${i + 1}`,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Số lượng mục trên mỗi trang

  // Dữ liệu hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  // Xử lý thay đổi trang
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
        // display:'flex',
        // flexDirection:'column',
        // alignItems:"center"
      }}
      >
        {/* Chỉ hiển thị dữ liệu trên trang hiện tại */}
        {currentData.map((item) => (
          <Col 
          
          span={24} key={item.id}>
            <InforCardHorizone title={item.title} description={item.description} />
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handlePageChange}
        style={{ marginTop: "16px",
          display:'flex',
          justifyContent:'center',
          textAlign: "center" }}
      />
    </Card>
  );
};

export default ListBooking;
