import React from "react";
import { Card, Button, Flex, Typography } from "antd";
const { Text } = Typography;
import {
  CreditCardOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const CardTourVertical = ({ ...props }) => {
  console.log(props)
  return (
    <Card
      style={{
        width: "100%", // Điều chỉnh để chiếm toàn bộ chiều rộng của Col
        maxWidth: 300, // Giới hạn chiều rộng tối đa của Card để tránh việc bị tràn
      }}
      cover={
        <img
          alt="example"
          src={props.imgurl}
          style={{ height: "200px", objectFit: "cover" }}
        />
      }
<<<<<<< HEAD
    >
      <Meta title={props.title} style={{}} />
      <div style={{ padding: "0" }}>
        <p>
          <CreditCardOutlined /> <strong> {props.tourCode} </strong>
        </p>
        <p>
          {" "}
          <EnvironmentOutlined /> Điểm xuất phát:
          <strong> {props.departureStart} </strong>
        </p>
        <p>
          <CalendarOutlined /> Ngày khỏi hành:<strong>{props.date} </strong>{" "}
        </p>
        <p>
          <ClockCircleOutlined /> Giờ:<strong> {props.departureTime} </strong>{" "}
        </p>
        <Flex justify="space-between" align="center">
          <Text>
            <strong
              style={{
                fontSize: "18px",
              }}
            >
              Giá :
            </strong>
            <strong>
              <Text type="danger"> {props.price} VND </Text>{" "}
            </strong>{" "}
          </Text>{" "}
          <Link to={`/tour/${props?.tourCode}`}>
            <Button danger size={3}>
              Đặt Ngay
            </Button>
          </Link>
=======
    
    }
    />
      <div style={{ padding: '0' ,
        
      }}>
        <p>< CreditCardOutlined/> <strong> {props.tourCode} </strong></p>
        <p> <EnvironmentOutlined/> Điểm xuất phát:<strong> {props.departureStart} </strong></p>
        <p><CalendarOutlined /> Điểm đến:<strong>{props.departureEnd} </strong> </p>
        <Flex
        justify='space-between'
        align='center'
        >
        <Text >
          <strong  style={{
            fontSize:'18px'
          }}>
          Giá :
          </strong>
          
          <strong><Text type="danger" > {props.price} VND </Text>  </strong> </Text> <Button danger size={3} >Đặt Ngay</Button>
>>>>>>> 52db80ae1017c119df5457c550113ddf86f498ee
        </Flex>
      </div>
    </Card>
  );
};

export default CardTourVertical;
