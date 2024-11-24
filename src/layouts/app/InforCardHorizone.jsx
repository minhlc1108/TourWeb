import React,{useState,useEffect} from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  CloseOutlined,
  SendOutlined,

} from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;
const InforCardHorizone = ({ title, description, image ,detail}) => {

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

  return (
   
      <Card
        style={{   
            display: "flex",
            // flexDirection:'column',
            flexDirection: isMobile ? "column" : "row",
            width: "100%",
            justifyItems:'center',
            alignItems:'center',
          
        }}
        cover={
          <img
            alt="example"
            style={{
              // width: isMobile ? "100%" : "150px",
            }}
            src={image || "https://via.placeholder.com/150"}
          />
        }
        actions={[
          // <SettingOutlined key="setting" />,
          <SendOutlined key="edit" />,
          <CloseOutlined key="ellipsis" />,
        ]}
      >
        <Meta
        style={{
          flex: 1, // Đảm bảo phần meta chiếm tối đa không gian còn lại
          width: "90vh", // Đảm bảo phần này chiếm đầy chiều ngang
          
        }}
         title={title || "Tên tour chưa có"} // Tiêu đề mặc định
         description={ "Lịch trình " + description + " Chi tiết " + detail || " Không có mô tả"} // Mô tả mặc định
        >
          {/* <div> check</div> */}
        </Meta>
      </Card>
  )
}

export default InforCardHorizone
