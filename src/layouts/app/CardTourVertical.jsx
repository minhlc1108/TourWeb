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

    style={{ width: 300,
     }}
    cover={
      <img
        alt="example"
        // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        src = {props.imgurl}
      />
    }
    >
    <Meta title={props.title} />
      <div style={{ padding: '10px' ,
        
      }}>
        <p>< CreditCardOutlined/> <strong> {props.tourCode} </strong></p>
        <p> <EnvironmentOutlined/> Organizer:<strong> {props.organizer} </strong></p>
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
