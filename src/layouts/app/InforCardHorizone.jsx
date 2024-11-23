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
const InforCardHorizone = () => {

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
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          // <SettingOutlined key="setting" />,
          <SendOutlined key="edit" />,
          <CloseOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          title="Name Tour"
          description="This is the description This is the descriptionThis is the descriptionThis is the descriptionThis is th "
        >
          {/* <div> check</div> */}
        </Meta>
      </Card>
  )
}

export default InforCardHorizone
