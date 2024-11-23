import { React, useState, useEffect } from "react";
import FeaturesTour from "./FeaturesTour";
import TourDetailsClient from "./TourDetailsClient";
import { Input, Space, Typography, Button, Calendar, theme } from "antd";
import { Col, Flex, Row, Select, Form, Checkbox } from "antd";
import { AudioOutlined } from "@ant-design/icons";
const { Text, Link } = Typography;
const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};
const { Search } = Input;
const tourData = [
  {
    imgurl:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    title: "Tour A",
    tourCode: "T001",
    organizer: "Nguyễn Văn A",
    departureTime: "08:00 AM",
    date: "2023-12-01",
    slotRemain: "5",
    price: "3,000,000 VND",
    departureStart: "TP.HCM",
    departureEnd: "Đà Nẵng",
    traffic: "Máy bay",
    category: "Du lịch biển",
  },
  {
    imgurl:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    title: "Tour B",
    tourCode: "T002",
    organizer: "Trần Thị B",
    departureTime: "09:30 AM",
    date: "2023-12-02",
    slotRemain: "3",
    price: "22,500,000 VND",
    departureStart: "Hà Nội",
    departureEnd: "Nha Trang",
    traffic: "Xe khách",
    category: "Du lịch khám phá",
  },
  {
    imgurl:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    title: "Tour C",
    tourCode: "T003",
    organizer: "Lê Văn C",
    departureTime: "07:00 AM",
    date: "2023-12-03",
    slotRemain: "1",
    price: "54,500,000 VND",
    departureStart: "Đà Nẵng",
    departureEnd: "Phú Quốc",
    traffic: "Tàu thủy",
    category: "Du lịch nghỉ dưỡng",
  },
  {
    imgurl:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    title: "Tour D",
    tourCode: "T004",
    organizer: "Nguyễn Thị D",
    departureTime: "10:00 AM",
    date: "2023-12-04",
    slotRemain: "2",
    price: "2,000,000 VND",
    departureStart: "TP.HCM",
    departureEnd: "Hà Nội",
    traffic: "Ô tô",
    category: "Du lịch văn hóa",
  },
  {
    imgurl:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    title: "Tour E",
    tourCode: "T005",
    organizer: "Trần Văn E",
    departureTime: "11:30 AM",
    date: "2023-12-05",
    slotRemain: "4",
    price: "1,500,000 VND",
    departureStart: "Hà Nội",
    departureEnd: "Cần Thơ",
    traffic: "Máy bay",
    category: "Du lịch sinh thái",
  },
  {
    imgurl:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    title: "Tour F",
    tourCode: "T006",
    organizer: "Nguyễn Văn F",
    departureTime: "12:00 PM",
    date: "2023-12-06",
    slotRemain: "6",
    price: "3,800,000 VND",
    departureStart: "Đà Nẵng",
    departureEnd: "Hà Nội",
    traffic: "Xe khách",
    category: "Du lịch mạo hiểm",
  },
  {
    imgurl:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    title: "Tour G",
    tourCode: "T007",
    organizer: "Trần Thị G",
    departureTime: "01:30 PM",
    date: "2023-12-07",
    slotRemain: "4",
    price: "2,200,000 VND",
    departureStart: "TP.HCM",
    departureEnd: "Phú Quốc",
    traffic: "Máy bay",
    category: "Du lịch lãng mạn",
  },
  {
    imgurl:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    title: "Tour H",
    tourCode: "T008",
    organizer: "Lê Văn H",
    departureTime: "03:00 PM",
    date: "2023-12-08",
    slotRemain: "2",
    price: "5,000,000 VND",
    departureStart: "Hà Nội",
    departureEnd: "Nha Trang",
    traffic: "Ô tô",
    category: "Du lịch khám phá",
  },
  {
    imgurl:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    title: "Tour I",
    tourCode: "T009",
    organizer: "Nguyễn Thị I",
    departureTime: "04:00 PM",
    date: "2023-12-09",
    slotRemain: "3",
    price: "11,800,000 VND",
    departureStart: "Đà Nẵng",
    departureEnd: "Cần Thơ",
    traffic: "Tàu thủy",
    category: "Du lịch khám phá",
  },
  {
    imgurl:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    title: "Tour J",
    tourCode: "T010",
    organizer: "Trần Văn J",
    departureTime: "05:30 PM",
    date: "2023-12-10",
    slotRemain: "5",
    price: "2,900,000 VND",
    departureStart: "TP.HCM",
    departureEnd: "Hà Nội",
    traffic: "Máy bay",
    category: "Du lịch nghỉ dưỡng",
  },
];
import { fetchAllTourAPI } from "~/apis";



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
      span: 24,
    },
    sm: {
      span: 26,
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

const TourPackage = () => {
  const [form] = Form.useForm();
  // const [budget,setBudget] = useState(0);
  // const [departureStart,setDepartureStart] = useState();
  // const [departureEnd, setDepartureEnd] = useState();
  // const [departureDate , setDepartureDate] = useState()
  // const [category, setCategory] = useState()
  // const [traffic, setTraffic] = useState()
  // const [departureOpitions , setDepartureOpitions] = useState();
  const [datafilter, setDatafilter] = useState({
    budget: "",
    departureStart: "",
    departureEnd: "",
    departureDate: "",
    category: "",
    traffic: "",
  });
  // const [tourData,setTourData] = useState()
  const [dataHaveFilter, setDataHaveFilter] = useState(tourData);

  useEffect(() => {
    const fetchData = async () => {
      const dataTour = await fetchAllTourAPI();
      console.log ( dataTour.tours)
      // setTourData(dataTour.tours);
    };
  
    fetchData();
  }, []);

  // console.log ( tourData)

  useEffect(() => {

    let filtered = tourData.filter((tour) => {
      // Kiểm tra từng điều kiện trong datafilter, chỉ áp dụng nếu có giá trị
      const matchesSearch = datafilter.search
        ? tour.title.toLowerCase().includes(datafilter.search.toLowerCase())
        : true;
      const matchesBudget = datafilter.budget
        ? (datafilter.budget === "under5" &&
            parseInt(tour.price.replace(/,/g, "")) < 5000000) ||
          (datafilter.budget === "5to10" &&
            parseInt(tour.price.replace(/,/g, "")) >= 5000000 &&
            parseInt(tour.price.replace(/,/g, "")) <= 10000000) ||
          (datafilter.budget === "10to20" &&
            parseInt(tour.price.replace(/,/g, "")) > 10000000 &&
            parseInt(tour.price.replace(/,/g, "")) <= 20000000) ||
          (datafilter.budget === "over20" &&
            parseInt(tour.price.replace(/,/g, "")) > 20000000)
        : true;
      const matchesDepartureStart = datafilter.departureStart
        ? tour.departureStart.includes(datafilter.departureStart)
        : true;
      const matchesDepartureEnd = datafilter.departureEnd
        ? tour.departureEnd.includes(datafilter.departureEnd)
        : true;
      const matchesDepartureDate = datafilter.departureDate
        ? tour.date === datafilter.departureDate
        : true;
      const matchesCategory = datafilter.category
        ? tour.category === datafilter.category
        : true;

      // Trả về true nếu tất cả các điều kiện đều thỏa mãn
      return (
        matchesSearch &&
        matchesBudget &&
        matchesDepartureStart &&
        matchesDepartureEnd &&
        matchesDepartureDate &&
        matchesCategory
      );
    });

    setDataHaveFilter(filtered);

    // console.log(datafilter); // Hoặc setFilteredData(filtered) nếu bạn muốn lưu kết quả lọc
  }, [datafilter]);

  return (
    <Flex vertical gutter={[5, 0]} style={{ paddingTop: "2%" }}>
      <Row
      style={{
        background:'white',
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",

      }}
      >
        <Col
          flex="1 0 20%"
          style={{
            height: "100vh",
            background: "white",
          }}
        >
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            style={{
              background: "white",
              height: "100%",
              margin: "2%",
              padding: "2%",
              borderRadius: "5px",
              // boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
            }}
            // initialValues={{ layout: vertical }}
            // style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
          >
            {/* <Form.Item
        label="Search"
        labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
      >
        <Input
          style={{ fontSize: "16px", height: "40px" }}
          placeholder="input placeholder"
        />
      </Form.Item> */}

            <Form.Item
              label="Ngân Sách"
              labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
            >
              <Select
                showSearch
                placeholder="Ngân sách"
                onChange={(value) => {
                  setDatafilter((prevData) => ({
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
                  {
                    value: "",
                    label: "Tất cả",
                  },
                  {
                    value: "under5",
                    label: "Dưới 5 triệu",
                  },
                  {
                    value: "5to10",
                    label: "Từ 5 - 10 triệu",
                  },
                  {
                    value: "10to20",
                    label: "Từ 10 triệu đến 20 tr",
                  },
                  {
                    value: "over20",
                    label: "Trên 20 triệu",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Điểm khởi hành"
              labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
            >
              <Select
                showSearch
                style={{ fontSize: "16px", height: "40px" }}
                placeholder="Điểm khởi hành"
                onChange={(value) => {
                  setDatafilter((prevData) => ({
                    ...prevData,
                    departureStart: value,
                  }));
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "",
                    label: "Tất cả",
                  },
                  {
                    value: "TP.HCM",
                    label: "Hồ Chí Minh",
                  },
                  {
                    value: "Hà Nội",
                    label: "Hà Nội",
                  },
                  {
                    value: "Đà nẵng",
                    label: "Đà nẵng",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Điểm đến"
              labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
            >
              <Select
                showSearch
                placeholder="Điểm đến"
                style={{ fontSize: "16px", height: "40px" }}
                onChange={(value) => {
                  setDatafilter((prevData) => ({
                    ...prevData,
                    departureEnd: value,
                  }));
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "",
                    label: "Tất cả",
                  },
                  {
                    value: "Cần thơ",
                    label: "Cần thơ",
                  },
                  {
                    value: "Hà Nội",
                    label: "Hà Nội",
                  },
                  {
                    value: "Phú Quốc",
                    label: "Phú Quốc",
                  },
                  {
                    value: "Nha Trang",
                    label: "Nha Trang",
                  },
                  {
                    value: "Đà Nẵng",
                    label: "Đà Nẵng",
                  },
                  {
                    value: "Hồ Chí Minh",
                    label: "Hồ Chí Minh",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
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

            <Form.Item
              label="Category"
              labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
            >
              <Select
                showSearch
                placeholder="Category"
                onChange={(value) => {
                  setDatafilter((prevData) => ({
                    ...prevData,
                    category: value,
                  }));
                }}
                style={{ fontSize: "16px", height: "40px" }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "",
                    label: "Tất cả",
                  },
                  {
                    value: "Du lịch biển",
                    label: "Du lịch biển",
                  },
                  {
                    value: "Du lịch khám phá",
                    label: "Du lịch khám phá",
                  },
                  {
                    value: "Du lịch nghỉ dưỡng",
                    label: "Du lịch nghỉ dưỡng",
                  },
                  {
                    value: "Du lịch văn hóa",
                    label: "Du lịch văn hóa",
                  },
                  {
                    value: "Du lịch sinh thái",
                    label: "Du lịch sinh thái",
                  },
                  {
                    value: "Du lịch mạo hiểm",
                    label: "Du lịch mạo hiểm",
                  },
                  {
                    value: "Du lịch lãng mạn",
                    label: "Du lịch lãng mạn",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Col>

        <Col
          flex="3 0 80%"
          style={{
            height: "100%",
            display:'flex',
            justifyContent:'center'
            // background: "black",
          }}
        >
          {/* <TourDetailsClient data={dataHaveFilter}  /> */}
          {/* <FeaturesTour  data={dataHaveFilter}  /> */}
        </Col>
      </Row>
    </Flex>
    //   <Flex

    //     style={{
    //       height: "100vh",
    //       // width:'100vh'
    //     }}
    //   >
    //   <Row
    //  gutter={[10, 0]}
    // style={{ paddingTop: "2%" ,
    //     // width:'100vh',
    //   // }}
    //   >
    //     <Col flex={1}>
    //   <Form
    //   {...formItemLayout}
    //   form={form}
    //   layout="vertical"
    //   style={{
    //     background: "white",
    //     height:"100%",
    //     // width: "20%",
    //     margin: "2%",
    //     padding: "2%",
    //     borderRadius: "5px",
    //     // position: "fixed", // Giữ cố định form khi cuộn
    //     boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
    //   }}
    //   // initialValues={{ layout: vertical }}
    //   // style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
    // >
    //   {/* <Form.Item
    //     label="Search"
    //     labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
    //   >
    //     <Input
    //       style={{ fontSize: "16px", height: "40px" }}
    //       placeholder="input placeholder"
    //     />
    //   </Form.Item> */}

    //   <Form.Item
    //     label="Ngân Sách"
    //     labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
    //   >
    //     <Select
    //       showSearch
    //       placeholder="Ngân sách"
    //       onChange={value => {
    //         setDatafilter(prevData => ({
    //           ...prevData,
    //           budget: value
    //         }));
    //       }}
    //       style={{ fontSize: "16px", height: "40px" }}
    //       filterOption={(input, option) =>
    //         (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    //       }
    //       options={[
    //         {
    //           value:'',
    //           label:'Tất cả'
    //         },
    //         {

    //           value: "under5",
    //           label: "Dưới 5 triệu",
    //         },
    //         {
    //           value: "5to10",
    //           label: "Từ 5 - 10 triệu",
    //         },
    //         {
    //           value: "10to20",
    //           label: "Từ 10 triệu đến 20 tr",
    //         },
    //         {
    //           value: "over20",
    //           label: "Trên 20 triệu",
    //         },
    //       ]}
    //     />
    //   </Form.Item>

    //   <Form.Item
    //     label="Điểm khởi hành"
    //     labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}

    //   >

    //     <Select
    //       showSearch
    //       style={{ fontSize: "16px", height: "40px" }}

    //       placeholder="Điểm khởi hành"
    //       onChange={value => {
    //         setDatafilter(prevData => ({
    //           ...prevData,
    //           departureStart: value
    //         }));
    //       }}
    //       filterOption={(input, option) =>
    //         (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    //       }
    //       options={
    //         [
    //           {
    //             value:'',
    //             label:'Tất cả'
    //           },
    //           {
    //             value: "TP.HCM",
    //             label: "Hồ Chí Minh",
    //           },
    //           {
    //             value: "Hà Nội",
    //             label: "Hà Nội",
    //           },
    //           {
    //             value: "Đà nẵng",
    //             label: "Đà nẵng",
    //           },

    //         ]
    //       }
    //     />
    //   </Form.Item>

    //   <Form.Item
    //     label="Điểm đến"
    //     labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
    //   >
    //     <Select
    //       showSearch
    //       placeholder="Điểm đến"
    //       style={{ fontSize: "16px", height: "40px" }}
    //       onChange={value => {
    //         setDatafilter(prevData => ({
    //           ...prevData,
    //           departureEnd: value
    //         }));
    //       }}
    //       filterOption={(input, option) =>
    //         (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    //       }
    //       options={[
    //         {
    //           value:'',
    //           label:'Tất cả'
    //         },
    //         {
    //           value: "Cần thơ",
    //           label: "Cần thơ",
    //         },
    //         {
    //           value: "Hà Nội",
    //           label: "Hà Nội",
    //         },
    //         {
    //           value: "Phú Quốc",
    //           label: "Phú Quốc",
    //         },
    //         {
    //           value: "Nha Trang",
    //           label: "Nha Trang",
    //         },
    //         {
    //           value: "Đà Nẵng",
    //           label: "Đà Nẵng",
    //         },
    //         {
    //           value: "Hồ Chí Minh",
    //           label: "Hồ Chí Minh",
    //         },

    //       ]}
    //     />
    //   </Form.Item>

    //   <Form.Item
    //     label="Ngày đi"
    //     labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
    //   >
    //     <Input
    //       placeholder="input placeholder"
    //       type="date"
    //       onChange={(e) => {
    //         setDatafilter(prevData => ({
    //           ...prevData,
    //           departureDate: e.target.value
    //         }));
    //       }}
    //       style={{ fontSize: "16px", height: "40px" }}
    //     />
    //   </Form.Item>

    //   <Form.Item
    //     label="Category"
    //     labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
    //   >
    //     <Select
    //       showSearch
    //       placeholder="Category"
    //       onChange={value => {
    //         setDatafilter(prevData => ({
    //           ...prevData,
    //           category: value
    //         }));
    //       }}
    //       style={{ fontSize: "16px", height: "40px" }}
    //       filterOption={(input, option) =>
    //         (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    //       }
    //       options ={
    //         [
    //         {
    //           value: '',
    //           label: 'Tất cả'
    //         },
    //         {
    //           value: 'Du lịch biển',
    //           label: 'Du lịch biển'
    //         },
    //         {
    //           value: 'Du lịch khám phá',
    //           label: 'Du lịch khám phá'
    //         },
    //         {
    //           value: 'Du lịch nghỉ dưỡng',
    //           label: 'Du lịch nghỉ dưỡng'
    //         },
    //         {
    //           value: 'Du lịch văn hóa',
    //           label: 'Du lịch văn hóa'
    //         },
    //         {
    //           value: 'Du lịch sinh thái',
    //           label: 'Du lịch sinh thái'
    //         },
    //         {
    //           value: 'Du lịch mạo hiểm',
    //           label: 'Du lịch mạo hiểm'
    //         },
    //         {
    //           value: 'Du lịch lãng mạn',
    //           label: 'Du lịch lãng mạn'
    //         },
    //       ]
    //     }

    //     />
    //   </Form.Item>

    //   <Form.Item
    //     label="Phương tiện"
    //     labelCol={{ style: { fontSize: "20px", fontWeight: "bold" } }}
    //   >
    //     <Select
    //       showSearch
    //       placeholder="Select a person"
    //       onChange={value => {
    //         setDatafilter(prevData => ({
    //           ...prevData,
    //           traffic: value
    //         }));
    //       }}
    //       style={{ fontSize: "16px", height: "40px" }}
    //       filterOption={(input, option) =>
    //         (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    //       }
    //       options={[
    //         {
    //           value:'Tất cả',
    //           label:'Tất cả'
    //         },
    //         {
    //           value: "Máy bay",
    //           label: "Máy bay",
    //         },
    //         {
    //           value: "Xe khách",
    //           label: "Xe khách",
    //         },
    //         {
    //           value: "Tàu thủy",
    //           label: "Tàu thủy",
    //         },
    //         {
    //           value: "Ô tô",
    //           label: "Ô tô",
    //         },
    //       ]}
    //     />
    //   </Form.Item>
    //   {/* <Form.Item>
    //       <Button
    //           type="primary"
    //           style={{ fontSize: "16px", height: "40px" }}
    //           block
    //         ><
    //   </Form.Item> */}
    //   </Form>
    //     </Col>

    //     <Col flex={4}>
    //       <FeaturesTour  data={dataHaveFilter}  />
    //     </Col>

    //     </Row>
    //  </Flex>
  );
};

export default TourPackage;
