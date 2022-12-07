import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../Assets/napkinmath.png';
import '../Styles/Home.css';

function Home() {
  const location = useLocation();
  const { user } = location.state;
  console.log(location.state);

  return (
    <div className='homePage'>
      <img src={logo} />
      <div className='welcomeDiv'>
        <h1 className='welcomeHeader'>
          Welcome <br></br> {user.given_name}!
        </h1>
        <Link to='/AddUsers' className='addusers'>
          Get Started!
        </Link>
      </div>
    </div>
  );
}

export default Home;
