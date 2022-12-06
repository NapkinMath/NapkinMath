import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Styles/global.css'
import Home from './Components/Home';

function App() {
    //where all routes will exist to each step/mobile page
    return (  
        <div className='appBody'>
            <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/Signup' element={} /> */}
                {/* <Route path='/AddUsers' element={} /> */}
                {/* <Route path='/ReceiptUpload' element={} /> */}
                {/* <Route path='/ItemSelector' element={} /> */}
                {/* <Route path='/TipAmount' element={} /> */}
                {/* <Route path='/FinalDisplay' element={} /> */}
            </Routes>
        </div>
    );
}

export default App;