// src/pages/Client/Home.jsx
import React from "react";
import "./Home.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel, Flex } from "antd";
import Search from "~/layouts/app/Search";

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

const PopularTours = () => (
  <section className="popular-tours" id="tours">
    <h2 className="tour-title">Tours</h2>
    <h2 className="sub-title">Most Popular Tours</h2>
    <div className="tour-list">
      <div className="tour-card">
        <img src="/tour-card1.jpg" alt="Tour 1" />
        <div className="tour-name">Wonder of the West Coast & Kimberley</div>
      </div>
      <div className="tour-card">
        <img src="/tour-card2.jpg" alt="Tour 2" />
        <div className="tour-name">Stonehenge, Windsor,and Bath in London</div>
      </div>
      <div className="tour-card">
        <img src="/tour-card3.jpg" alt="Tour 3" />
        <div className="tour-name">Switzerland</div>
      </div>
      <div className="tour-card">
        <img src="/tour-card4.jpg" alt="Tour 4" />
        <div className="tour-name">Germany</div>
      </div>
    </div>
  </section>
);

const TopAttractions = () => (
  <section className="top-attractions" id="destination">
    <h2 className="tour-title">Destination</h2>
    <h2 className="sub-title">Top Attractions Destinations</h2>
    <div className="attractions-list">
      <div className="attraction-card">
        <img src="/united-kingdom.jpg" alt="United Kingdom" />
        <div className="attraction-name">United Kingdom</div>
      </div>
      <div className="attraction-card">
        <img src="/turkey.jpg" alt="Turkey" />
        <div className="attraction-name">Turkey</div>
      </div>
      <div className="attraction-card">
        <img src="/japan.jpg" alt="Switzerland" />
        <div className="attraction-name">Japan</div>
      </div>
      <div className="attraction-card">
        <img src="/france.jpg" alt="France" />
        <div className="attraction-name">France</div>
      </div>
    </div>
  </section>
);

const OurExperiences = () => (
  <section className="our-experiences" id="about">
    <div className="experience-content">
      <img src="/our.jpg" alt="Experience" />

      <div className="experience-text">
        <h2 className="tour-title">Why Choose Us</h2>
        <p>Our Experiences meet high quality standards</p>
        <ul>
          <li>Travel Plan</li>
          <li>Cheap Rates</li>
          <li>Hand-picked Tours</li>
          <li>Private Guide</li>
        </ul>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="testimonials">
    <div className="testimonials-content">
      <div className="testimonial-text">
        <h2 className="tour-title">Testimonials</h2>
        <h2 className="sub-title">What Travelers Say</h2>
        <blockquote className="testimonial-quote">
          “The UI designs he crafted are top-notch, and the design system he
          integrated allows for straightforward fixes and bulk updates
          throughout almost every area of the app.”
        </blockquote>
        <p className="testimonial-author">- By Mollie Rosa, Photographer</p>
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
          <img style={contentStyle}  src="/Carousel2.jpg" alt="" />
        </div>
        <div>
        <img style={contentStyle}  src="/Carousel3.jpg" alt="" />

        </div>
        <div>
        <img style={contentStyle}  src="/Carousel6.jpg" alt="" />

        </div>
        
      </Carousel>
     
    
    </Flex>
     <div
     style={{
      display:'flex',
      justifyContent:'center'
     }}
     >
     <Search/>
     </div>
     </>
  );
};

export default Home;
