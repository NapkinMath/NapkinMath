import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Styles/global.css'
import Home from './Components/Home';
import AddUsers from './Components/AddUsers';
import ItemSelector from './Components/ItemSelector';
import SignIn from './Components/SignIn';
import TipAmount from './Components/TipAmount';
import ImageForm from './Components/ImageForm';
function App() {

    //where all routes will exist to each step/mobile page
    return (  
        <div className='appBody'>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/Home' element={ <Home/>} />
                <Route path='/AddUsers' element={<AddUsers />} />
                <Route path='/ImageForm' element={<ImageForm />} />
                <Route path='/ItemSelector' element={<ItemSelector />} />
                <Route path='/TipAmount' element={<TipAmount />} />
                {/* <Route path='/FinalDisplay' element={} /> */}
            </Routes>
        </div>
    );
}

export default App;
