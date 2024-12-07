import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Select } from "antd";
import { Line, Pie, Column } from "@ant-design/charts";
import {
  fetchAllTourAPI,
  fetchAllCategoryAPI,
  fetchAllCustomerAPI
} from "~/apis";

function StatisticAdmin() {
  const bookingData = [
    { tour: "Tour A", bookings: 150 },
    { tour: "Tour B", bookings: 300 },
  ];

  const bookingConfig = {
    data: bookingData,
    xField: "tour",
    yField: "bookings",
    label: { position: "middle" },
    color: "#cf1322",
  };

  const categoryData = [
    { type: "Adventure", count: 40 },
    { type: "Relaxation", count: 60 },
  ];

  const categoryConfig = {
    data: categoryData,
    angleField: "count",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "spider",
      content: "{name}: {percentage}",
    },
  };

  const monthlyRevenue = [
    { period: "Jan", revenue: 3000 },
    { period: "Feb", revenue: 4000 },
    { period: "Mar", revenue: 4000 },
    { period: "Apr", revenue: 4000 },
    { period: "May", revenue: 4000 },
    { period: "Jun", revenue: 4000 },
    { period: "Aug", revenue: 4000 },
    { period: "Sep", revenue: 4000 },

  ];

  const weeklyRevenue = [
    { period: "Week 1", revenue: 1000 },
    { period: "Week 2", revenue: 1500 },
    { period: "Week 3", revenue: 1500 },
    { period: "Week 4", revenue: 1500 },

  ];

  const yearlyRevenue = [
    { period: "2021", revenue: 50000 },
    { period: "2022", revenue: 60000 },
    { period: "2023", revenue: 60000 },
    { period: "2024", revenue: 60000 },

  ];

  const [data, setData] = useState(monthlyRevenue);

  const revenueConfig = {
    data: data,
    xField: "period",
    yField: "revenue",
    label: { position: "middle" },
    point: { size: 5, shape: "diamond" },
  };

  const handleChange = (value) => {
    if (value === "month") {
      setData(monthlyRevenue);
    } else if (value === "week") {
      setData(weeklyRevenue);
    } else if (value === "year") {
      setData(yearlyRevenue);
    }
  }


    const [countUserCate, setCountUserCate] = useState([]);
    const [countUser, setCountUser] = useState(0);
    const [countTour, setCountTour] = useState(0);


    useEffect(() => {
      const fetchData = async () => {
        const result = await fetchAllCustomerAPI();
        const Tour = await fetchAllTourAPI();
        // console.log (Tour)
        setCountTour(Tour.total);
        setCountUser (result.total)
        // Giả sử fetchAllCategoriesAPI trả về danh sách các danh mục
        const response  = await fetchAllCategoryAPI();
        const counts = [];
        // console.log("API Response:", categories);
        const categories = response.categories;
        // Duyệt qua tất cả các danh mục
        // for (const category of categories) {
        //   let userCount = 0;
        //   console.log("Category:", categories); 
        //   // Duyệt qua tất cả các tour của danh mục
        //   for (const tour of category.tours) {
        //     console.log("  Tour:", tour);
        //     // Duyệt qua tất cả các lịch trình (schedules) của tour
        //     for (const schedule of tour.tourSchedules) {
        //       // Duyệt qua tất cả các bookings của schedule
        //       for (const booking of schedule.bookings) {
        //         // Tính tổng số booking details
        //         userCount += booking.bookingDetails.length;
        //       }
        //     }
        //   }
        //   // Lưu kết quả cho danh mục này
        //   counts.push({
        //     category: category.name,
        //     UserNumber: userCount,
        //   });
        // }
        // onsole.log("Counts by category:", counts);
        // setCountUserCate(counts);
      };
  
      fetchData();
    }, []);


  return (


    <Card title="Thống Kê" padding="1.25rem 1.25rem 0">
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Doanh Thu"
              value={112800}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              suffix="VND"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Người Dùng"
              value={countUser}
              // precision={2}
              valueStyle={{ color: "#3f8600" }}
              suffix="User"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Lượt Đặt Tour"
              value={countTour}
              // precision={2}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>
      <Card title="Doanh Thu">
        <Select
          defaultValue="month"
          onChange={handleChange}
          style={{ marginBottom: 16 }}
        >
          <Select.Option value="month">Theo Tháng</Select.Option>
          <Select.Option value="week">Theo Tuần</Select.Option>
          <Select.Option value="year">Theo Năm</Select.Option>
        </Select>
        <Line {...revenueConfig} />
      </Card>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Booking" bordered={false}>
            <Column {...bookingConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} title="Category">
            <Pie {...categoryConfig} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

export default StatisticAdmin;
