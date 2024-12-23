import { React, useState, useEffect } from "react";
import FeaturesTour from "./FeaturesTour";
import TourDetailsClient from "./TourDetailsClient";
import { Input, Space, Typography, Button, Calendar, theme } from "antd";
import { Col, Flex, Row, Select, Form, Checkbox } from "antd";
import { AudioOutlined } from "@ant-design/icons";
const { Text, Link } = Typography;
import { useLocation } from "react-router-dom";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};
const { Search } = Input;

import { fetchAllTourAPI,
  fetchAllCategoryAPI
 } from "~/apis";

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

const TourPackage = ({ dataInput }) => {
  const [form] = Form.useForm();
  const location = useLocation();

 

  const searchParams = location.state || {
    budget: "",
    departureStart: "",
    departureEnd: "",
    departureDate: "",
    category: "",
    traffic: "",
  };
  // console.log ( 'search apraasm',searchParams)

  const [datafilter, setDatafilter] = useState({
    budget: "",
    departureStart: "",
    departureEnd: "",
    departureDate: "",
    category: "",
    traffic: "",
  });
  // const [datafilter, setDatafilter] = useState(searchParams);
  // console.log(' date fil;lter',datafilter)
  function formatDate(inputDate) {
    if (!inputDate) return ""; // Xử lý nếu input là null hoặc undefined
  
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) return ""; // Xử lý nếu input không phải ngày hợp lệ
  
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày, thêm số 0 nếu <10
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
  
    return `${day}/${month}/${year}`; // Định dạng DD/MM/YYYY
  }
  const [opCate, setOpCate] = useState([])
  const [opDeparture,setOpDeparture] = useState([])
  const [opDestination,setOpDestination] = useState([])
  const [tourData, setTourData] = useState([]);
  const [dataHaveFilter, setDataHaveFilter] = useState(tourData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllTourAPI();
        const dataTour = response.tours; // Dữ liệu fetch được
        const cate = await fetchAllCategoryAPI();
        const categoryNames = cate.categories.map((category) => category.name);


        const uniqueDepartures = [
          ...new Set(
            dataTour.map((tour) => tour.departure.trim().toLowerCase()) // Loại bỏ khoảng trắng và chuẩn hóa chữ thường
          ),
        ];

        const uniqueDestination = [
          ...new Set(
            dataTour.map((tour) => tour.destination.trim().toLowerCase()) // Loại bỏ khoảng trắng và chuẩn hóa chữ thường
          ),
        ];
        
          
        const departureOptions = [
          { value: "", label: "Tất cả" }, // Thêm option mặc định
          ...uniqueDepartures.map((departure) => ({
            value: departure.charAt(0).toUpperCase() + departure.slice(1), // Viết hoa ký tự đầu
            label: departure.charAt(0).toUpperCase() + departure.slice(1),
          })),
        ];
        const CateOptions = [
          { value: "", label: "Tất cả" }, // Thêm option mặc định
          ...categoryNames.map((cate) => ({
            value: cate.charAt(0).toUpperCase() + cate.slice(1), // Viết hoa ký tự đầu
            label: cate.charAt(0).toUpperCase() + cate.slice(1),
          })),
        ];
        
       

        const destinationOptions = [
          { value: "", label: "Tất cả" }, // Thêm option mặc định
          ...uniqueDestination.map((destination) => ({
            value: destination.charAt(0).toUpperCase() + destination.slice(1), // Viết hoa ký tự đầu
            label: destination.charAt(0).toUpperCase() + destination.slice(1),
          })),
        ];
        
        // console.log(departureOptions);
        setOpCate(CateOptions)
        setOpDestination (destinationOptions)
        setOpDeparture(departureOptions)
        // console.log(opDeparture)

        const processedData = dataTour.map((tour) => {
          // Lấy dữ liệu từ schedule đầu tiên (nếu có)
          const schedule = tour.tourSchedules[0] || {};
          const image = tour.images[0] || {};

          return {
            imgurl: image.url || "", // URL hình ảnh
            title: tour.name, // Tên tour
            tourCode: tour.id, // Mã tour
            departureTime: schedule.departureDate
              ? new Date(schedule.departureDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "", // Lấy phần giờ
            date: schedule.departureDate
              ? new Date(schedule.departureDate).toLocaleDateString()
              : "", // Lấy phần ngày
            slotRemain: schedule.remain || 0, // Số chỗ còn lại
            price: schedule.priceAdult || 0, // Giá người lớn
            departureStart: tour.departure, // Nơi khởi hành
            departureEnd: tour.destination, // Điểm đến
            category: tour.categoryName, // Danh mục tour
          };
        });

        setTourData(processedData);
        setDatafilter(searchParams);

        // setDatafilter(processedData);
        // console.log("proces ", processedData); // Kiểm tra dữ liệu sau xử lý
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchData();
  }, []);
  // setTourData(dataInput);
  // console.log ( 'datafilter',datafilter)

  useEffect(() => {
    // console.log("tourdata", tourData);
    let filtered = tourData.filter((tour) => {
      // Kiểm tra từng điều kiện trong datafilter, chỉ áp dụng nếu có giá trị
      const matchesSearch = datafilter.search
        ? tour.title.toLowerCase().includes(datafilter.search.toLowerCase())
        : true;
      const priceAsNumber =
        typeof tour.price === "string"
          ? parseInt(tour.price.replace(/,/g, ""), 10)
          : tour.price;
      const matchesBudget = datafilter.budget
        ? (datafilter.budget === "under5" && priceAsNumber < 5000000) ||
          (datafilter.budget === "5to10" &&
            priceAsNumber >= 5000000 &&
            priceAsNumber <= 10000000) ||
          (datafilter.budget === "10to20" &&
            priceAsNumber > 10000000 &&
            priceAsNumber <= 20000000) ||
          (datafilter.budget === "over20" && priceAsNumber > 20000000)
        : true;
      const matchesDepartureStart = datafilter.departureStart
        ? tour.departureStart.includes(datafilter.departureStart)
        : true;
            console.log ('cehck diem bd',tour.departureStart)

      const matchesDepartureEnd = datafilter.departureEnd
        ? tour.departureEnd.includes(datafilter.departureEnd)
        : true;
            console.log ( matchesDepartureEnd)
            // console.log ('check dk departend',tour.departureEnd)
            // console.log ('check dk departend',datafilter.departureEnd)


      const matchesDepartureDate = datafilter.departureDate
        ? tour.date === formatDate(datafilter.departureDate)
        : true;
        // console.log('1', tour.date)
        // console.log('2', datafilter.departureDate)

       
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
    // console.log ('checkdatahvefilter', dataHaveFilter)
    // console.log("datafilter", datafilter); // Hoặc setFilteredData(filtered) nếu bạn muốn lưu kết quả lọc
  }, [datafilter]);
  console.log ('checkdatahvefilter', dataHaveFilter)

  return (
    <Flex vertical gutter={[5, 0]} style={{ paddingTop: "2%" }}>
      <Row
        style={{
          padding: "2% 1%",
          background: "white",
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
                options={opDeparture}
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
                options={opDestination}
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
                options={opCate}
              />
            </Form.Item>
          </Form>
        </Col>

        <Col
          flex="3 0 80%"
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            // background: "black",
          }}
        >
          <TourDetailsClient data={dataHaveFilter} />
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
