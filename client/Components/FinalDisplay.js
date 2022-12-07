import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/FinalDisplay.css';
import UserBubble from './UserBubbles';


function FinalDisplay() {
    const { state } = useLocation();
    const { userData, tip, total, tax, imageData } = state;
    const [isThereRemainder, setRemainder] = useState(false)
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
    //need tax owed for each user
    remainder.amount = Math.round(remainder.amount * 100) / 100
    //need to proportionally add tax and tip and round user totals
    userData.forEach(user => {
        const percentageInDecimal = (user.total / total)
        const userTax = percentageInDecimal * tax
        const userTip = percentageInDecimal * tip
        user.total += (userTax + userTip)
        user.total = Math.round(user.total * 100) / 100
    })
    // imageData should now have a contributed key, with all users on that item
    // userData will have every user, who now has the total amount they should be paying
    // remainder should consist of an array with item names unaccounted for, and the remaining value of those items
    // console.log(imageData)
    console.log(userData)
    // console.log(remainder)

    if(remainder.amount !== 0){
        return (
                <div className='finalDisplay'>
                    <h1 className='header'>It appears as though some items were left unaccounted for...</h1>
                    <h3>Total left over - {remainder.amount}</h3>
                    {remainder.itemNames.map(itemName => {
                        return(
                            <div className='eachItem'>
                                <p>{itemName}</p>
                            </div>
                        )
                    })}
                    <div className='footer'>
                        <h1 className='header'>Please restart the process</h1>
                    </div>
                </div>
        )
    }

    return (  
        <div className='finalDisplay'>
            <h1 className='header'>Below is what everyone owes:</h1>
            <h3>(Tax and Tip included)</h3>
            {/* <div className='gridContainer'> */}
                {userData.map((userobj,i) => {
                    console.log(userobj)
                    return(
                        <div className='eachUser' key={i}>
                            <h1 className='eachUserName'>
                            <UserBubble
                                username={userobj.Username}
                                key={userobj.Username}
                                location={'FinalDisplay'}
                                index={i}
                                currentTurn={true}
                            />
                            </h1>
                            <h1 className='eachUserOwes'>
                                {userobj.total}    
                            </h1>
                        </div>
                    )
                })}
            {/* </div> */}
            <div className='footer'>
                <button className='finished'>
                    Save this experience
                </button>
            </div>
        </div>
    );
}

export default FinalDisplay;