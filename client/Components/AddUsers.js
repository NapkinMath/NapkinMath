import React, { useState } from 'react';
import '../Styles/AddUsers.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import UserBubble from './UserBubbles';

function AddUsers() {
    // hook for users, 
    const [users, addUser] = useState([]);
    //addPerson needs to store all users, and create user bubble, and clear input field
    function addPerson(){
        const newUser = document.getElementById('outlined-basic')
        if(newUser.value.length === 2) {
            addUser(prevUsers => [...prevUsers, newUser.value.toUpperCase()])
            newUser.value = '';
        }
        // console.log(users)
    }
    return (
        <div className='addUsers'>
            <h1 className='header'>Who should be included on the bill?</h1>
            <div className="userInput">
                <TextField id="outlined-basic" label="Initials of each person" variant="outlined" />
                <Button variant="contained" onClick={addPerson}>+</Button>
                {users.map(user => <UserBubble username={user} key={user} />)}
            </div>
            {/* vvv should link to image upload, need to hold props */}
            <Link to='/ImageForm' state={users} style={{marginTop: 'auto'}}>
                <Button variant="contained" >Finished</Button>
            </Link>
        </div>  
    );
}

export default AddUsers;