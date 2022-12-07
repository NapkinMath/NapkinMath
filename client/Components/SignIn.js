import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'

function SignIn() {
    const [user, setUser] = useState({})

    // OAUTH client ID
    // 385492980089-7ep2nugbvqsjsnokrc419er34hat2oaf.apps.googleusercontent.com
    // OUATH Secret Key
    // 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

    function handleCallbackResponse(response) {
        console.log("Successfully authenticate through Google O-auth")
        const userInfo = jwt_decode(response.credential);
        setUser(userInfo)
        document.getElementById('signInDiv').hidden = true;
    }

    useEffect( () => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "385492980089-7ep2nugbvqsjsnokrc419er34hat2oaf.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
             { theme: "outline", size: "large"}
        );
    }, [])

    return ( 
        <div>
            <div id="signInDiv"></div>
            { user &&
                <div>
                    <img src={user.picture}></img>
                    <h3>{user.name}</h3>
                </div>
            }
            <Link to='/Home'>
                <button>This redirects to home. Needs to do it automatically after successful login.</button>
            </Link>
        </div> 
    );
}

export default SignIn;