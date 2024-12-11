import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  CloseOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { Card, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";

import {
  fetchAllTourAPI,
  fetchAllCategoryAPI,
  fetchAllCustomerAPI,
  fetchAllBookingAPI,
  getTourByIdAPI,
  deleteBookingAPI
  // deleteTourAPI,
} from "~/apis";

const { Meta } = Card;
const InforCardHorizone = ({
  title,
  id,
  description,
  image,
  detail,
  price,
  time,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Lắng nghe sự thay đổi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDelete = () => {

    
  };

  return (
    <Card
      style={{
        display: "flex",
        // flexDirection:'column',
        flexDirection: isMobile ? "column" : "row",
        width: "100%",
        justifyItems: "center",
        alignItems: "center",
      }}
      cover={
        <img
          alt="example"
          style={
            {
              // width: isMobile ? "100%" : "150px",
            }
          }
          src={image || "https://via.placeholder.com/150"}
        />
      }
      actions={[
        // <SettingOutlined key="setting" />,

        <Link to="/tourClient">
          <SendOutlined key="send" style={{ fontSize: "16px" }} />
        </Link>,

        <Popconfirm
          title="Bạn có chắc chắn muốn xóa tour này không?"
          onConfirm={handleDelete} // Hành động khi xác nhận
          onCancel={() => message.info("Hủy xóa tour.")} // Hành động khi hủy
          okText="Xóa"
          cancelText="Hủy"
        >
          <CloseOutlined key="delete" />
        </Popconfirm>,
      ]}
    >
      <Meta
        style={{
          flex: 1, // Đảm bảo phần meta chiếm tối đa không gian còn lại
          width: "90vh", // Đảm bảo phần này chiếm đầy chiều ngang
        }}
        title={title || "Tên tour chưa có"} // Tiêu đề mặc định
        description={
          <div>
            <p>{description || "Không có lịch trình"}</p>
            <p>Thời gian : {time || " Chưa có thời gian "} </p>
            <p>{price || "Chưa có giá"}</p>
          </div>
          // "Lịch trình " + description + price || " Không có mô tả"
        } // Mô tả mặc định
      >
        {/* <div> check</div> */}
      </Meta>
    </Card>
  );
};

export default InforCardHorizone;
