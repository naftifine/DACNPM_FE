import React from 'react';
import Navbar from "./Navbar";
import MainBanner from './MainBanner';
import Suggestions from './Suggestions';
import Header from '../../components/Layout/conponent/Header';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="HomePage">
        <Navbar />
        <MainBanner />
        <Suggestions />
      </div>
    </div>
  );
}

export default HomePage;
