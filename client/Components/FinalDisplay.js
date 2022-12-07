import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/FinalDisplay.css';
import UserBubble from './UserBubbles';

function FinalDisplay() {
    const { state } = useLocation();
    const { userData, tip, total, tax, imageData } = state;
    // console.log(state)
    //FinalDisplay will need to:
        //Have a main object to keep track of everyone assigned to each item
        //once this object is complete (iterating through all user data)
            //we should be able to then get user totals and what they owe
            //for any items left unaccounted for, a remainder notification will show -- recommend to start over

    //create object based on ImageData, then start iterating through each user Object searching
        //for checked === true
    imageData.forEach(item => {
        item.contributed = []
    })
    userData.forEach(user => {
        user.total = 0;
        user.itemsSelected.forEach((item, i) => {
            if (item.checked === true) imageData[i].contributed.push(user.Username)
        })
    })
    //now add up the user totals for each item based on how many people split that item
    const remainder = {
        itemNames : [],
        amount: 0
    }
    userData.forEach((user,i) => {
        imageData.forEach((item, j) => {
            if (item.contributed.includes(user.Username)){
                user.total += Math.round((item.itemPrice / item.contributed.length) * 100) / 100
            }
        })
    })
    imageData.forEach(item => {
        if (item.contributed.length === 0){
            remainder.itemNames.push(item.itemName);
            remainder.amount += item.itemPrice
        }
    })
    remainder.amount = Math.round(remainder.amount * 100) / 100
    //round user totals
    userData.forEach(user => {
        user.total = Math.round(user.total * 100) / 100
    })
    // imageData should now have a contributed key, with all users on that item
    // userData will have every user, who now has the total amount they should be paying
    // remainder should consist of an array with item names unaccounted for, and the remaining value of those items
    // console.log(imageData)
    console.log(userData)
    // console.log(remainder)

    return (  
        <div className='finalDisplay'>
            <h1 className='header'>Below is what everyone owes</h1>
            {userData.map((userobj,i) => {
                return(
                    <div className='eachUser' key={i}>
                        
                    </div>
                )
            })}
        </div>
    );
}

export default FinalDisplay;