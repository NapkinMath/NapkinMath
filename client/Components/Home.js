import React from 'react';
import { Link } from "react-router-dom";

function Home() {
    return ( 
        <div>
            <div>need to place image here</div>
            <div>Welcome to NapkinMath!</div>
            <Link to='/AddUsers'>
                <button>add users</button>
            </Link>
        </div> 
    );
}

export default Home