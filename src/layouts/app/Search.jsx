import { Input, Space, Typography, Button, Calendar, Divider, Col, Row, Select, Form, Checkbox, ConfigProvider } from "antd";
import React ,{useState} from 'react';
import { AntDesignOutlined, SearchOutlined  } from '@ant-design/icons';
// import { createStyles } from 'antd-style';
import { useNavigate,Link } from "react-router-dom";

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

const Search = ({data}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  console.log ( 'check datee cate',data)

  const [searchParams, setSearchParams] = useState({
    search: "",
    budget: "",
    departureStart: "",
    departureEnd: "",
    category: "",
  });
  const [position, setPosition] = useState('end');
  console.log ('this is para',searchParams)
  const handleSearch = () => {
    form
      .validateFields()
      .then((values) => {
        // Chuyển đến trang tourClient và truyền dữ liệu
        navigate("/tourClient", { state: searchParams });
      })
      .catch((error) => {
        console.error("Lỗi khi nhập form:", error);
      });
  };

  const destinationOptions = Array.isArray(data)
  ? data.map((destination) => ({
      value: destination,
      label: destination,
    }))
  : [];


  // console.log ('hi' , destinationOptions )

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
              onChange={(value) => {
                setSearchParams((prevData) => ({
                  ...prevData,
                  departureStart: value,
                }));
              }}
              style={{ fontSize: "16px", height: "40px" }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[{ value: "", label: "Tất cả" }, ...destinationOptions]}
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
              onChange={(value) => {
                setSearchParams((prevData) => ({
                  ...prevData,
                  budget: value,
                }));
              }}
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
                setSearchParams((prevData) => ({
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
            display:'flex',
            justifyContent:'center',
          }}
            label="Tìm kiếm"
            labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
          >
          <Button
          htmlType="submit" 
          size='large'
          icon={<SearchOutlined />} iconPosition={position}
          onClick={handleSearch}
          >
             Search
           {/* <Link to={"/tourClient"}>

           </Link>  */}
          </Button>
          </Form.Item>

        </Form>

      

      </Col>
     
     
    </Row>
  );
};

export default Search;
