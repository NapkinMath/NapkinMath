import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import '../Styles/SignIn.css';
import logo from '../Assets/napkinmath.png';

function SignIn(props) {
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    const userInfo = jwt_decode(response.credential);

    // Below is used to set a user token when they successfully log in
    const jwt = JSON.stringify(userInfo);
    localStorage.setItem('napkin-token', jwt);
    props.setToken(jwt);

    navigate('/Home');
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '385492980089-7ep2nugbvqsjsnokrc419er34hat2oaf.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
      width: '180',
    });
  }, []);

  return (
    <div id='Sign-in-container'>
      <img src={logo} />
      <div className='loginDiv'>
        <label>Username:</label>
        <input placeholder='username'></input>
      </div>
      <div className='loginDiv'>
        <label>Password:</label>
        <input placeholder='password'></input>
      </div>
      <button className='loginBtns'>Login</button>
      <button className='loginBtns'>Sign Up</button>
      <div id='signInDiv'></div>
    </div>
  );
}

export default SignIn;
