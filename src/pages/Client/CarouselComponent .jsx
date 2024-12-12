import { React, useState, useEffect } from "react";
import { Carousel, Card, Row, Col, Button, Flex, Pagination } from "antd";
import { Link, useLocation } from "react-router-dom";

const CarouselComponent = ({ data }) => {
  if (!Array.isArray(data)) {
    return <div>Data is not available</div>; // Hoặc một thông báo lỗi khác
  }
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Hiển thị 3 tour mỗi trang

  // Chia dữ liệu thành các nhóm 3 tour
  const startIndex = (currentPage - 1) * pageSize;
  const currentTours = data.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log("check data", data);
  return (
    <div
      style={{
        paddingTop: "8%",
        width: "100%", // Đảm bảo Carousel có chiều rộng phù hợp
        margin: "0 auto", // Căn giữa Carousel
        display: "flex", // Đảm bảo sử dụng flexbox để căn chỉnh
        justifyContent: "center", // Căn giữa nội dung bên trong
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Row
        gutter={16}
        style={{
          width: "100%",
        }}
        justify="center"
        align="middle"
      >
        {currentTours.map((tour, idx) => (
          <Col key={tour.id} span={6}>
            <Link to={`/tour/${tour.id}`}>
              <Card hoverable cover={<img alt={tour.name} src={tour.image} />}>
                <Card.Meta title={tour.name} description={tour.detail} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>

    // <Carousel
    //   autoplay
    //   style={{
    //     paddingTop:'8%' ,
    //     width: '80%', // Đảm bảo Carousel có chiều rộng phù hợp
    //     margin: '0 auto', // Căn giữa Carousel
    //     display: 'flex', // Đảm bảo sử dụng flexbox để căn chỉnh
    //     justifyContent: 'center', // Căn giữa nội dung bên trong
    //   }}
    // >
    //   {data.map((item) => (
    //     <div key={item.id}>
    //       <div style={{ padding: 20, backgroundColor: "#f0f0f0" }}>
    //         <Row gutter={16} justify="center" align="middle"> {/* Căn giữa các thẻ trong Row */}
    //           {/* Hiển thị 3 Card trong một slide */}
    //           {data.slice(0, 3).map((tour, idx) => (
    //             <Col key={idx} span={8}>
    //               <Card
    //                 hoverable
    //                 cover={<img alt={tour.name} src={tour.image} />}
    //               >
    //                 <Card.Meta title={tour.name} description={tour.detail} />
    //               </Card>
    //             </Col>
    //           ))}
    //         </Row>
    //       </div>
    //     </div>
    //   ))}

    // </Carousel>
  );
};

export default CarouselComponent;
