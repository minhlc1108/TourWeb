import { Input, Space, Typography, Button, Calendar, Divider, Col, Row, Select, Form, Checkbox, ConfigProvider } from "antd";
import React ,{useState} from 'react';
import { AntDesignOutlined, SearchOutlined  } from '@ant-design/icons';
// import { createStyles } from 'antd-style';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 30,
    },
    sm: {
      span: 40,
    },
  },
};

const Search = () => {
  const [form] = Form.useForm();
  const [searchData,setSearchData] = useState();
  const [position, setPosition] = useState('end');
  const handleSearch = ( values) => {
    setSearchData({
      destination : values.destination ,
      budget : values.budget, 
      date : values.date  
    }
    )

  }

  return (
    <Row gutter={[26, 16]} justify="start" style={{ paddingTop: "2%" }}>
      <Col>
        <Form
          {...formItemLayout}
          form={form}
          layout="vertical"
          style={{
            background: "white",
            height: "100%",
            width:'80vw',
            padding: "2%",
            borderRadius: "5px",
            display: 'flex',
            justifyItems: 'center',
            justifyContent:'space-evenly',
            flexDirection: 'row', // Đặt các Form.Item nằm ngang
            alignItems: 'center', // Căn giữa các Form.Item
          }}
          onFinish={handleSearch} 
        >
          <Form.Item
          style={{
            width:'30%',
          }}
            label="Bạn muốn đi đâu ?"
            labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
          >
            <Select
              showSearch
              placeholder="Điểm đến"
              style={{ fontSize: "16px", height: "40px" }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "", label: "Tất cả" },
                { value: "Cần thơ", label: "Cần thơ" },
                { value: "Hà Nội", label: "Hà Nội" },
                { value: "Phú Quốc", label: "Phú Quốc" },
                { value: "Nha Trang", label: "Nha Trang" },
                { value: "Đà Nẵng", label: "Đà Nẵng" },
                { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
              ]}
            />
          </Form.Item>
          <Divider type="vertical"
          
          style={{ 
            height: '100%',     // Tự động điều chỉnh chiều cao để phù hợp với nội dung
            borderWidth: '2px', // Thay đổi độ dày của divider
            margin: '0 16px',   // Điều chỉnh khoảng cách từ các phần tử bên cạnh
          }} 
          />
          <Form.Item
           style={{
            width:'30%',
          }}
            label="Ngân Sách"
            labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
          >
            <Select
              showSearch
              placeholder="Ngân sách"
              style={{ fontSize: "16px", height: "40px" }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "", label: "Tất cả" },
                { value: "under5", label: "Dưới 5 triệu" },
                { value: "5to10", label: "Từ 5 - 10 triệu" },
                { value: "10to20", label: "Từ 10 triệu đến 20 tr" },
                { value: "over20", label: "Trên 20 triệu" },
              ]}
            />
          </Form.Item>
          <Divider type="vertical" 
          
          style={{ 
            height: '100%',     // Tự động điều chỉnh chiều cao để phù hợp với nội dung
            borderWidth: '2px', // Thay đổi độ dày của divider
            margin: '0 16px',   // Điều chỉnh khoảng cách từ các phần tử bên cạnh
          }} 
          />
          <Form.Item
           style={{
            width:'30%',
          }}
            label="Ngày đi"
            labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
          >
            <Input
              placeholder="input placeholder"
              type="date"
              onChange={(e) => {
                setDatafilter((prevData) => ({
                  ...prevData,
                  departureDate: e.target.value,
                }));
              }}
              style={{ fontSize: "16px", height: "40px" }}
            />
          </Form.Item>

          <Divider type="vertical" 
          
          style={{ 
            height: '100%',     // Tự động điều chỉnh chiều cao để phù hợp với nội dung
            borderWidth: '2px', // Thay đổi độ dày của divider
            margin: '0 16px',   // Điều chỉnh khoảng cách từ các phần tử bên cạnh
          }} 
          />

          <Form.Item
           style={{
          }}
            label="Tìm kiếm"
            labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
          >
          <Button
          size='large'
          icon={<SearchOutlined />} iconPosition={position}>
            Search
          </Button>
          </Form.Item>

        </Form>

      

      </Col>
     
     
    </Row>
  );
};

export default Search;
