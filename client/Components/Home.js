import React from 'react';
import { Link } from "react-router-dom";
import logo from "../Assets/napkinmath.png"

function Home() {
    return ( 
        <div>
            <div>Welcome to NapkinMath!</div>
            <img src = {logo}/>
            <Link to='/AddUsers'>
                <button>add users</button>
            </Link>
        </div> 
    );
}

export default Home