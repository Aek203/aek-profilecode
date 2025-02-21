import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // ไฟล์ CSS สำหรับตกแต่ง

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to My Website</h1>
        <p>Your one-stop solution for amazing features</p>
      </header>
      <div className="homepage-buttons">
        <Link to="/login" className="btn btn-login">Login</Link>
        <Link to="/register" className="btn btn-register">Register</Link>
      </div>
    </div>
  );
};

export default HomePage;
