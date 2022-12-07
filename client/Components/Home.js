import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/napkinmath.png';
import '../Styles/Home.css';

function Home() {
  const { given_name } = JSON.parse(localStorage.getItem('napkin-token'));

  return (
    <div className='homePage'>
      <img src={logo} />
      <div className='welcomeDiv'>
        <h1 className='welcomeHeader'>
          Welcome <br></br> {given_name}!
        </h1>
        <Link to='/AddUsers' className='addusers'>
          Get Started!
        </Link>
      </div>
    </div>
  );
}

export default Home;
