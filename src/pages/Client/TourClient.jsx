import TourPackage from './TourPackage';
import { fetchAllTourAPI } from "~/apis";
import { React, useState, useEffect } from "react";


const Tour = () => {

  // const [dataInput, setDataInput] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchAllTourAPI();
  //       const dataTour = response.tours; // Dữ liệu fetch được
  //       const processedData = dataTour.map(tour => {
  //         // Lấy dữ liệu từ schedule đầu tiên (nếu có)
  //         const schedule = tour.tourSchedules[0] || {};
  //         const image = tour.images[0] || {};
  
  //         return {
  //           imgurl: image.url || "", // URL hình ảnh
  //           title: tour.name, // Tên tour
  //           tourCode: tour.id, // Mã tour
  //           departureTime: schedule.departureDate
  //             ? new Date(schedule.departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //             : "", // Lấy phần giờ
  //           date: schedule.departureDate
  //             ? new Date(schedule.departureDate).toLocaleDateString()
  //             : "", // Lấy phần ngày
  //           slotRemain: schedule.remain || 0, // Số chỗ còn lại
  //           price: schedule.priceAdult || 0, // Giá người lớn
  //           departureStart: tour.departure, // Nơi khởi hành
  //           departureEnd: tour.destination, // Điểm đến
  //           category: tour.categoryName, // Danh mục tour
  //         };
  //       });

  //       setDataInput(processedData)
  
  //       console.log(processedData); // Kiểm tra dữ liệu sau xử lý
  //     } catch (error) {
  //       console.error("Error fetching tours:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  return (
    <div>
      <TourPackage  />
    </div>
  );
};

export default Tour;
