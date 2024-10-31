import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';
import {CreditCardOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CarOutlined,
  CalendarOutlined }  from "@ant-design/icons";
const { Text, Link ,Paragraph} = Typography;

const cardStyle = {
  width: "50%",
};
const imgStyle = {
  display: 'block',
  width: '40%',
};


const CardTour = (...props) => (
  <Card
    hoverable
    style={cardStyle}
    styles={{
      body: {
        padding: 0,
        overflow: 'hidden',
      },
      display:"flex",
      
    }}
  >
    <Flex justify="space-between">
      <img
        alt="avatar"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        style={imgStyle}
      />
      <Flex
        vertical
        align="flex-end"
        justify="space-between"
        style={{
          padding: 32,
        }}
      >
        <Flex
        vertical
        align="flex-start"
        justify="space-between"
        >
        <Typography.Title 
        style={{
          margin:'0'
        }}
        level={4}>
          “Đà lạt - Muôn ngàn trải nghiệm : lác bobla - dapa hill - thung lũng ty”
        </Typography.Title>
        <Text
        style={{
          paddingTop:"10px"
        }}>
        <CreditCardOutlined 
        style={{
          paddingRight: '0.5rem '
        }}
        />
          <Text>
          Mã tour : 
          <Text strong >
          ABC123456
          </Text>
          </Text>

         
          <Text
          style={{
            paddingLeft:"2rem"
          }}
          >
          <EnvironmentOutlined
          style={{
            paddingRight: '0.5rem '

          }}
          />
          Khởi hành : 
          <Text strong >
          ABC123456
          </Text>
          </Text>

        </Text>

        <Text
        style={{
          paddingTop:"10px"
        }}>
        <ClockCircleOutlined 
        style={{
          paddingRight: '0.5rem '
        }}
        />
          <Text>
          Thời Gian : 
          <Text strong >
          3N 2Đ
          </Text>
          </Text>

         
          <Text
          style={{
            paddingLeft:"2rem"
          }}
          >
          <CarOutlined 
          style={{
            paddingRight: '0.5rem '

          }}
          />
          Phương tiện : 
          <Text strong >
          Xe
          </Text>
          </Text>

        </Text>

        <Text
        
        style={{
          paddingTop:"10px"
        }}>
        <CalendarOutlined  
        style={{
          paddingRight: '0.5rem '
        }}
        />
          <Text>
          Ngày khởi hành : 
          </Text>

          
          

        </Text>
        </Flex>

        <Flex 
        align="center"
        style={{
          width:'100%',
          justifyContent:'space-between'
        }}

        >
          <Flex
            vertical
          >
          <Text >
            Giá :
          </Text>
          <Typography.Title type='danger' 
          strong
          level={3}
          style={{margin:'0'}}
          >
            2.500.000 vnd
          </Typography.Title>
          </Flex>
        <Button type="primary" size="large" href="https://ant.design" target="_blank">
          Xem Chi tiết 
        </Button>
        </Flex>

      </Flex>

    </Flex>
  </Card>
);
export default CardTour;