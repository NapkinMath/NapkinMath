import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import '../Styles/SignIn.css';
import logo from '../Assets/napkinmath.png';

function SignIn() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // OAUTH client ID
  // 385492980089-7ep2nugbvqsjsnokrc419er34hat2oaf.apps.googleusercontent.com
  // OUATH Secret Key
  // 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

  function handleCallbackResponse(response) {
    console.log('Successfully authenticate through Google O-auth');
    const userInfo = jwt_decode(response.credential);
    setUser(userInfo);
    document.getElementById('signInDiv').hidden = true;

    navigate('/Home', { state: { user: userInfo } });
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
      width: '270',
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
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default SignIn;
