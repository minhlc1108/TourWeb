// src/pages/Client/Home.jsx
import React, { useEffect, useState } from "react";
import "./Home.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Search from "~/layouts/app/Search";
import { Row, Col, Image, Flex ,Result,Carousel, Button} from "antd";
import CardTourVertical from "~/layouts/app/CardTourVertical";
import { Link, useLocation } from "react-router-dom";

import {
  fetchAllTourAPI,
  fetchAllCategoryAPI,
  fetchAllCustomerAPI,
  fetchAllBookingAPI,
  getTourByIdAPI,
} from "~/apis";
import TopTour from "./TopTour";
import CarouselComponent from "./CarouselComponent ";

const Header = () => (
  <header className="header">
    <div className="logo">Tour</div>
    <nav className="navbar">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#tours">Tours</a>
      <a href="#destination">Destination</a>

      <a href="#pages">Pages</a>
      <a href="#contact">Contact</a>
    </nav>
    <div className="auth-buttons">
      <button className="login">Login</button>
      <button className="signup">Sign Up</button>
    </div>
  </header>
);

const Banner = () => (
  <section className="banner">
    <h1>Travel & Adventures</h1>
    <p>Find awesome hotels, tours, and activities</p>
  </section>
);
// const [countTour, setCountTour] = useState(0);

const TopAttractions = () => (
  <section className="top-attractions" id="destination">
    <h2 className="tour-title">Destination</h2>
    <h2 className="sub-title">Top Attractions Destinations</h2>
    <div className="attractions-list"></div>
  </section>
);

const OurExperiences = () => (
  <section className="our-experiences" id="about">
    <div className="experience-content">
      <img src="/our.jpg" alt="Experience" />

      <div className="experience-text">
        <h2 className="tour-title">Đến với chung tôi để nhận được dịch vụ tốt nhất </h2>
        <ul>
          <li>Lịch trình chỉnh chu </li>
          <li>Giá Hợp lý </li>
          <li>Tư vấn điện ảnh tuyệt đối</li>
        </ul>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="testimonials">
    <div className="testimonials-content">
      <div className="testimonial-text">
        <h2 className="tour-title">Trải nghiệm tuyệt vời </h2>
        <h2 className="sub-title">Phản hồi  từ khách hàng </h2>
        <blockquote className="testimonial-quote">
          “Sốp quá tuyệt vời quá đỉnh :D  .”
        </blockquote>
        <p className="testimonial-author">- By Em Chiến Q4 :D </p>
      </div>
      <div className="testimonial-images">
        <img src="/traveler1.jpg" alt="Traveler 1" />
        <img src="/traveler2.png" alt="Traveler 2" />
        <img src="/traveler3.jpg" alt="Traveler 3" />
      </div>
    </div>
  </section>
);

const LatestTravelGuide = () => (
  <section className="latest-travel-guide">
    <h2 className=" tour-title">Updatetours</h2>
    <h2 className="sub-title">Latest Travel Guide</h2>
    <div className="travel-guide-grid">
      <div className="travel-guide-item">
        <img src="/guild1.jpg" alt="Guide 1" />
        <div className="guide-info">
          <span className="guide-date">October 13, 2024 • Admin</span>
          <h3>Travel & tourism</h3>
        </div>
      </div>
      <div className="travel-guide-item">
        <img src="/guild2.png" alt="Guide 2" />
        <div className="guide-info">
          <span className="guide-date">October 13, 2024 • Admin</span>
          <h3>Travel & tourism</h3>
        </div>
      </div>
      <div className="travel-guide-item">
        <img src="/guild3.jpg" alt="Guide 3" />
        <div className="guide-info">
          <span className="guide-date">October 13, 2024 • Admin</span>
          <h3>Travel & tourism</h3>
        </div>
      </div>
      <div className="travel-guide-item">
        <img src="/guild4.jpg" alt="Guide 4" />
        <div className="guide-info">
          <span className="guide-date">October 13, 2024 • Admin</span>
          <h3>Travel & tourism</h3>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2024 All Rights Reserved</p>
    <p>Contact us: theboys@gmail.com</p>
  </footer>
);

const Home = () => {
  const contentStyle = {
    height: "100%",
    width: "100%",
    // lineHeight: "300px",
    // textAlign: "center",
    objectFit: "cover",
  };
  const [dataTour , setDataTour] = useState()
  const [dataCate, setDataCate] = useState();
  // const [currentData,setCurrentData] = useState(1)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tour = await fetchAllTourAPI()
        const Cate = await fetchAllCategoryAPI();
      console.log('tour ', tour)

        const categoryNames = Cate.categories.map((category) => category.name);

        // const result = await fetchAllBookingAPI();
        // const categoryNames = (Cate?.categories || []).map(
        //   (category) => category.name
        // );
        // const categoryNames = (Cate?.categories || []).map((category) => category.name);

        const toursData = (tour?.tours || []).map(t => ({
          id: t.id,
          name: t.name,
          image: t.images[0]?.url, // Lấy ảnh đầu tiên của mỗi tour (nếu có)
        }));

        console.log('dattour',toursData)
        setDataTour(toursData)
        // setCurrentData(result)
        setDataCate(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setDataCate([]); // Tránh lỗi khi fetch thất bại
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <Flex
        vertical
        style={{
          height: "calc(30vw)",
          width: "100%", // Giới hạn chiều rộng
          margin: "0 auto", // Căn giữa
          overflow: "hidden", // Ẩn phần bị tràn
          zIndex: "0",
          position: "relative",
        }}
      >
        <Carousel
          autoplay
          autoplaySpeed={2000}
          easing="ease-in-out"
          arrows
          infinite={true}
        >
          <div>
            <img style={contentStyle} src="/Carousel1.jpg" alt="" />
          </div>
          <div>
            <img style={contentStyle} src="/Carousel2.jpg" alt="" />
          </div>
          <div>
            <img style={contentStyle} src="/Carousel3.jpg" alt="" />
          </div>
          <div>
            <img style={contentStyle} src="/Carousel6.jpg" alt="" />
          </div>
        </Carousel>
      </Flex>

      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Search data={dataCate} />
      </div>
      {/* <PopularTours /> */}
          
      <CarouselComponent
      data = {dataTour}/>
      <Flex
      justify="center"
      style={{
        paddingTop:'2%',
        width:'80%',
        margin: "0px auto"
      }}
   
      >
      <Button
      style={{
      }}
      size="large">
    <Link to={"/tourClient"}>Xem tất cả </Link>
     </Button>
      </Flex>

      <OurExperiences/>
      {/* <TopTour/> */}
    </>
  );
};

export default Home;
