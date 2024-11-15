import { React, useState } from "react";
import { Row, Col, Image, Flex } from "antd";
import CardTourVertical from "~/layouts/app/CardTourVertical";
import { Pagination } from "antd";

const TourDetailsClient = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Số lượng CardTourVertical hiển thị trên mỗi trang
  const tourData = data;
  // Xác định dữ liệu hiển thị cho trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  return (
    // <Flex
    // justify="center"
    // >
    // <Row
    //   style={{
    //     backgroundColor: "white",
    //     width: "100%",
    //     height: "100%",
    //     padding: "10px",
    //     maxWidth: "1200px", // Giới hạn chiều rộng của Row
    //     margin: "0 auto", // Căn giữa
    //     overflow: "hidden", // Ngăn tràn

    //   }}
    //   gutter={[8, 8]} // Thêm khoảng cách giữa các Col
    // >
    //   {currentData.length === 0 ? (
    //     <Result title="Your operation has been executed" />
    //   ) : (
    //     currentData.map((item, index) => (
    //       <Col key={index} xs={24} sm={12} md={6} >
    //         <CardTourVertical {...item} />
    //       </Col>
    //     ))
    //   )}

      
    // </Row>
    // <Pagination
    //     current={currentPage}
    //     pageSize={pageSize}
    //     total={tourData.length}
    //     onChange={(page) => setCurrentPage(page)}
    //     style={{ textAlign: "center", marginTop: "20px" }}
    //   />
    // </Flex>

    <div style={{ backgroundColor: "white", maxWidth: "1200px", margin: "0 auto", padding: "10px",display:"flex", flexDirection:'column', alignItems:'center' }}>
      <Row gutter={[8, 8]}
       justify="start" 
       >
        {currentData.length === 0 ? (
          <Result title="Không có dữ liệu hiển thị" />
        ) : (
          currentData.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={6} lg={currentData.length < 3 ? 12 : 6} >
              <CardTourVertical {...item} />
            </Col>
          ))
        )}
      </Row>
      {/* Phần Pagination đặt ngay dưới Row */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ textAlign: "center", marginTop: "20px" }}
      />
    </div>
  );
};

export default TourDetailsClient;
