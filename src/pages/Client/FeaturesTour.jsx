import { Flex } from "antd";
import { React, useState } from "react";
import CardTour from "~/layouts/app/CardTour";
import CardTourVertical from "~/layouts/app/CardTourVertical";
import FooterClient from "~/layouts/app/FooterClient";
import { Col, Divider, Row, Select, Result } from "antd";
import { Pagination } from "antd";
// const data = [\
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//     departureStart: 'TPhcm',
//     departureEnd : 'Đã nẵng'
//   },
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//   },
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//   },
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//   },
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//   },
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//   },
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//   },
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//   },
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//   },
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//   },
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//   },
//   {
//     imgurl:
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Tour 6",
//     tourCode: "T0075",
//     organizer: "Alice Johnson",
//     departureTime: " 22:00 AM",
//     date: "13-9-2021",
//     slotRemain: "2",
//     price: "2000000vnd",
//   },
// ];


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const FeaturesTour = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9; // Số lượng CardTourVertical hiển thị trên mỗi trang
  const tourData = data;
  // Xác định dữ liệu hiển thị cho trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  // // Hàm xử lý khi thay đổi trang
  // const onPageChange = (page) => {
  //   setCurrentPage(page);
  // };
  // const onChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
  // const onSearch = (value) => {
  //   console.log("search:", value);
  // };

  return (
      // <Flex
      // vertical
      //   style={{
      //     // width: "100%",
      //     margin: "2%",
      //     padding: "2%",
      //     borderRadius: "5px",
      //     background: "white",

      //     // position: "fixed", // Giữ cố định form khi cuộn
      //     boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      //   }}
      // >
       
      //     <Row 
      //     gutter={[16, 16]}
      //   // style={{justifyContent:'center'}}
      //   >
       
      //     {currentData.length === 0 ? (
      //       <Result
      //         title="Your operation has been executed"
              
      //       />
      //     ) : (
      //       currentData.map((item, index) => (
      //         <Col key={index} xs={24} sm={12} md={8} lg={8}>
      //           <CardTourVertical {...item} />
      //         </Col>
      //       ))
      //     )}
      //   </Row>

      //   {/* Component phân trang */}
      //   <Pagination
      //     current={currentPage}
      //     pageSize={pageSize}
      //     total={data.length}
      //     onChange={onPageChange}
      //     style={{
      //       marginTop: "16px",
      //       textAlign: "center",
      //       display: "flex",
      //       justifyContent: "center",
      //     }} // Canh giữa pagination
      //   />
      // </Flex>2
      

      
          <Row 
          gutter={[4, 4]}
        style={{
          justifyContent:'center',
          width:"100%",
          height:'100%'
        }}
        >
       
          {currentData.length === 0 ? (
            <Result
              title="Your operation has been executed"
              
            />
          ) : (
            currentData.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={8}>
                <CardTourVertical {...item} />
              </Col>
            ))
          )}
        </Row>

  );
};

export default FeaturesTour;
