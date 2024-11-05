import { Flex } from 'antd';
import {React, useState} from 'react'
import CardTour from '~/layouts/app/CardTour'
import CardTourVertical from '~/layouts/app/CardTourVertical'
import FooterClient from '~/layouts/app/FooterClient'
import { Col, Divider, Row } from 'antd';
import { Pagination } from 'antd';
import TourPackage from './TourPackage';
import ProfileUser from './ProfileUser';



const Home = () => {
  
  return (
    <div>
      {/* <TourPackage/> */}
      <ProfileUser/>
  </div>
  );
};

export default Home
