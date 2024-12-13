import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Select } from "antd";
import { Line, Pie, Column } from "@ant-design/charts";
import {
  fetchAllTourAPI,
  fetchAllCategoryAPI,
  fetchAllCustomerAPI,
  fetchAllBookingAPI,
  getTourByIdAPI,
} from "~/apis";

// tk tour
function StatisticAdmin() {
  const [categoryData, setCategoryData] = useState([]);

  const getWeekNumber = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  };

  // Nhóm và tính tổng
  const groupByPeriod = (bookings, period) => {
    return bookings.reduce((acc, booking) => {
      const date = new Date(booking.time);
      let key;
      if (period === "month") {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; // YYYY-MM
      } else if (period === "week") {
        key = `${date.getFullYear()}-W${getWeekNumber(date)}`; // YYYY-WW
      } else if (period === "year") {
        key = `${date.getFullYear()}`; // YYYY
      }
  
      // Cộng tổng
      acc[key] = (acc[key] || 0) + booking.totalPrice;
      return acc;
    }, {});
  };
  const sortGroupedData = (groupedData) => {
    return Object.entries(groupedData)
      .sort(([keyA], [keyB]) => new Date(keyA) - new Date(keyB)) // Sắp xếp key theo thời gian
      .reduce((acc, [key, value]) => {
        acc[key] = value; // Chuyển lại thành object
        return acc;
      }, {});
  };

  const [countUserCate, setCountUserCate] = useState([]);
  const [countUser, setCountUser] = useState(0);
  const [countTour, setCountTour] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceByMonth, setTotalPriceByMonth] = useState(0);
  const [totalPriceByYear, setTotalPriceByYear] = useState(0);
  const [totalPriceByWeek, setTotalPriceByWeek] = useState(0);
  const [data, setData] = useState([]);

  const [staticCate, setStaticCate] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAllCustomerAPI();
        // console.log('check result ', result.length)
        const totalBooking = await fetchAllBookingAPI({pageSize: 100});

        const DsBookings = totalBooking.bookings;
        console.log("checkdsb", DsBookings);
        const Tour = await fetchAllTourAPI();
        // console.log('check result ', Tour.length)

        const totalByMonth = groupByPeriod(totalBooking.bookings.filter((booking) => booking.status === 1) , "month");
        const totalByWeek = groupByPeriod(totalBooking.bookings.filter((booking) => booking.status === 1) , "week");
        const totalByYear = groupByPeriod(totalBooking.bookings.filter((booking) => booking.status === 1) , "year");

        const totalPrice = totalBooking.bookings
          .filter((booking) => booking.status === 1) // Lọc chỉ các booking có status = 1
          .reduce((acc, booking) => acc + booking.totalPrice, 0);

        setTotalPrice(totalPrice);
        setCountTour(totalBooking.total || 0);
        setCountUser(result.length || 0);


        console.log('mounth', sortGroupedData(totalByMonth),'month')
        
        setTotalPriceByMonth(sortGroupedData(totalByMonth,"month"));
        setTotalPriceByYear(sortGroupedData(totalByYear,"year"));
        setTotalPriceByWeek(sortGroupedData(totalByWeek,"week"));

        const dataTour = Tour.tours || [];
        if (!Array.isArray(dataTour)) {
          console.error("dataTour is not an array:", dataTour);
          return;
        }

        // Tính toán categoryCounts
        const categoryCounts = dataTour.reduce((acc, tour) => {
          const categoryName = tour.categoryName;

          if (!categoryName) {
            console.warn(`Tour object missing categoryName:`, tour);
            return acc;
          }

          acc[categoryName] = (acc[categoryName] || 0) + 1;
          return acc;
        }, {});

        // Chuyển categoryCounts thành categoryData
        const newCategoryData = Object.entries(categoryCounts).map(
          ([type, count]) => ({
            type,
            count,
          })
        );

        async function categorizeBookings(Bookings) {
          const categoryCounts = {}; // Object để lưu số lượng

          for (const booking of Bookings) {
            const tourId = booking.tourSchedule.tourId; // Lấy tourId từ booking
            const myTour = await getTourByIdAPI(tourId); // Gọi API lấy thông tin tour
            const categoryName = myTour.categoryName; // Lấy tên danh mục (categoryName)

            // Tăng số lượng cho danh mục tương ứng
            if (categoryCounts[categoryName]) {
              categoryCounts[categoryName]++;
            } else {
              categoryCounts[categoryName] = 1;
            }
          }

          return setCountUserCate(categoryCounts);
        }

        categorizeBookings(DsBookings);

        // console.log (totalByMonth)
        // setData(totalPriceByMonth)
        const defaultData = Object.entries(totalByMonth).map(
          ([period, revenue]) => ({
            period,
            revenue,
          })
        );

        setData(defaultData);

        // Cập nhật state
        setCategoryData(newCategoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log ('tk tour ', countUserCate)

  const handleChange = (value) => {
    let sortedData = [];
    if (value === "month") {
      sortedData = Object.entries(totalPriceByMonth)
        .map(([period, revenue]) => ({ period, revenue }))
        // .sort((a, b) => new Date(a.period) - new Date(b.period)); // Sắp xếp theo ngày
    } else if (value === "week") {
      sortedData = Object.entries(totalPriceByWeek)
        .map(([period, revenue]) => ({ period, revenue }))
        // .sort(
        //   (a, b) =>
        //     new Date(a.period.split("-W")[0]) -
        //     new Date(b.period.split("-W")[0])
        // ); // Sắp xếp theo tuần
    } else if (value === "year") {
      sortedData = Object.entries(totalPriceByYear)
        .map(([period, revenue]) => ({ period, revenue }))
        // .sort((a, b) => a.period - b.period); // Sắp xếp theo năm
    }
    setData(sortedData);
  };

  const revenueConfig = {
    data: data,
    xField: "period",
    yField: "revenue",
    label: { position: "middle" },
    point: { size: 5, shape: "diamond" },
  };

  // const bookingData = Object.entries(countUserCate).map(([period, revenue]) => ({
  //   period,
  //   revenue,
  // }));

  const bookingData = Object.entries(countUserCate).map(([tour, bookings]) => ({
    tour,
    bookings,
  }));

  // console.log('checkbokdata', bookingData)
  // const bookingData = [
  //   { tour: "Tour A", bookings: 150 },
  //   { tour: "Tour B", bookings: 300 },
  // ];

  const bookingConfig = {
    data: bookingData,
    xField: "tour",
    yField: "bookings",
    label: { position: "middle" },
    color: "#cf1322",
  };

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

  // const monthlyRevenue = [
  //   { period: "Jan", revenue: 3000 },
  //   { period: "Feb", revenue: 4000 },
  //   { period: "Mar", revenue: 4000 },
  //   { period: "Apr", revenue: 4000 },
  //   { period: "May", revenue: 4000 },
  //   { period: "Jun", revenue: 4000 },
  //   { period: "Aug", revenue: 4000 },
  //   { period: "Sep", revenue: 4000 },
  // ];

  // const yearlyRevenue = [
  //   { period: "2021", revenue: 50000 },
  //   { period: "2022", revenue: 60000 },
  //   { period: "2023", revenue: 60000 },
  //   { period: "2024", revenue: 60000 },
  // ];

  // console.log('this is week',weeklyRevenue);

  // console.log(categoryData);
  // console.log(totalPrice);

  return (
    <Card title="Thống Kê" padding="1.25rem 1.25rem 0">
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Doanh Thu"
              value={totalPrice}
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
