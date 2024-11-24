import React from 'react'
import { Card ,Button, Flex,Typography } from 'antd';
const { Text, Link } = Typography;
import {CreditCardOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    CarOutlined,
    CalendarOutlined }  from "@ant-design/icons";
    

const { Meta } = Card;


const CardTourVertical = ({...props}) => {
  return (
    <Card

    style={{
      width: '100%', // Điều chỉnh để chiếm toàn bộ chiều rộng của Col
      maxWidth: 300, // Giới hạn chiều rộng tối đa của Card để tránh việc bị tràn
    }}
    cover={
      <img
        alt="example"
        src = {props.imgurl}
        style={{ height: '200px', objectFit: 'cover' }}
      />
    }
    >
    <Meta title={props.title} />
      <div style={{ padding: '0' ,
        
      }}>
        <p>< CreditCardOutlined/> <strong> {props.tourCode} </strong></p>
        <p> <EnvironmentOutlined/> Điểm xuất phát:<strong> {props.departureStart} </strong></p>
        <p><CalendarOutlined /> Ngày khỏi hành:<strong>{props.date} </strong> </p>
        <p><ClockCircleOutlined /> Giờ:<strong> {props.departureTime} </strong> </p>
        <Flex
        justify='space-between'
        align='center'
        >
        <Text >Giá :<strong><Text type="danger" > {props.price}</Text>  </strong> </Text> <Button danger size={3} >Đặt Ngay</Button>
        </Flex>
        
      </div>
  </Card>
  )
}

export default CardTourVertical
