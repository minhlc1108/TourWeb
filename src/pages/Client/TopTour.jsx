import { React, useEffect, useState } from "react";
import {
  fetchAllTourAPI,
  fetchAllCategoryAPI,
  fetchAllCustomerAPI,
  fetchAllBookingAPI,
  getTourByIdAPI,
} from "~/apis";

const TopTour = () => {
  const [countTour, setCountTour] = useState(0);
  const [countUserCate, setCountUserCate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalBooking = await fetchAllBookingAPI();
        const DsBookings = totalBooking.bookings

        const Tour = await fetchAllTourAPI();


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

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log ('check',countUserCate)

  return(
<div>
    Hi 

</div>

  ) 
};

export default TopTour;
