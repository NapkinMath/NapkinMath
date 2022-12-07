import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './Styles/global.css';
import Home from './Components/Home';
import AddUsers from './Components/AddUsers';
import ItemSelector from './Components/ItemSelector';
import SignIn from './Components/SignIn';
import TipAmount from './Components/TipAmount';
import ImageForm from './Components/ImageForm';
import FinalDisplay from './Components/FinalDisplay';

function App() {
  function tokenSetup() {
    let pulledToken = JSON.parse(localStorage.getItem('napkin-token'));
    if (pulledToken) {
      return pulledToken;
    } else {
      return null;
    }
  }

  // const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState(tokenSetup());
  const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       navigate('/Home');
//     }
//   }, [token]);

//   if (!token) {
//     console.log('No token identified.');
//     return (
//       <div className='appBody'>
//         <Routes>
//           <Route path='/' element={<SignIn setToken={setToken} />} />
//           <Route path='/Home' element={<SignIn setToken={setToken} />} />
//           <Route path='/AddUsers' element={<SignIn setToken={setToken} />} />
//           <Route path='/ImageForm' element={<SignIn setToken={setToken} />} />
//           <Route
//             path='/ItemSelector'
//             element={<SignIn setToken={setToken} />}
//           />
//           <Route path='/TipAmount' element={<SignIn setToken={setToken} />} />
//           <Route path='/FinalDisplay' element={<SignIn setToken={setToken} />} />
//         </Routes>
//       </div>
//     );
//   }

  //where all routes will exist to each step/mobile page
  console.log('token identified');
  return (
    <div className='appBody'>
      <Routes>
        {/* <Route path='/' element={<SignIn />} /> */}
        <Route path='/Home' element={<Home />} />
        <Route path='/AddUsers' element={<AddUsers />} />
        <Route path='/ImageForm' element={<ImageForm />} />
        <Route path='/ItemSelector' element={<ItemSelector />} />
        <Route path='/TipAmount' element={<TipAmount />} />
        <Route path='/FinalDisplay' element={<FinalDisplay />} />
      </Routes>
    </div>
  );
}

export default App;
