import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserBubble from './UserBubbles';
import '../Styles/ItemSelector.css'
import { useNavigate } from 'react-router-dom';

const dummyData = {
    itemsList: [
      { itemPrice: 2.8, itemName: 'Cold Beverage'},
      { itemPrice: 2.8, itemName: 'Cold Beverage' },
      { itemPrice: 12.9, itemName: 'Lunch Small Salmon' },
      { itemPrice: 14.5, itemName: 'Lunch Salmon' },
      { itemPrice: 2, itemName: 'Lunch Cup Chix Chg / w' },
      { itemPrice: 10.9, itemName: 'Lunch Fettuccine Carrabba' },
      { itemPrice: 12.9, itemName: 'Lunch Small Salmon' },
      { itemPrice: 11.5, itemName: 'Lunch Strawberry Salad' },
      { itemPrice: 12.7, itemName: 'Lunch Sim Chix Bryan' },
      { itemPrice: 2, itemName: 'Lunch House Salad Add On' },
      { itemPrice: 7.2, itemName: 'Dessert Rosa' },
      { itemPrice: 7.2, itemName: 'Dessert Rosa' },
      { itemPrice: 7.9, itemName: 'Sogno di Cioccolata' },
      { itemPrice: 7.9, itemName: 'Sogno di Cioccolata' }
    ],
    tax: 9.04
}

function ItemSelector() {
    //for props passed from AddUsers via React Router on click
    const location = useLocation();
    const data = location.state

    //Navigation when finished (above return)
    const navigate = useNavigate();

    //hook city
    const [checkedState, setCheckedState] = useState(
        new Array(dummyData.itemsList.length).fill(false)
    );
    const [currentTurn, setTurn] = useState(data[0])
    const [currentUserObj, setCurrentUserObj] = useState({
        Username: currentTurn,
        itemsSelected: 
            dummyData.itemsList.map(item => {
                return ({
                    itemName: item.itemName,
                    itemPrice: item.itemPrice,
                    checked: false
                })
            })
    })
    const [completedUsers, setCompleted] = useState([])
    function boxTicker(position){
        setCheckedState(
            checkedState.map((bool, i) => {
                if (i === position) bool = !bool
                return bool
            })
        )
    }
    ///////////////////////////////
    const defaultUserObj = {
        Username: currentTurn,
        itemsSelected: 
            dummyData.itemsList.map(item => {
                return ({
                    itemName: item.itemName,
                    itemPrice: item.itemPrice,
                    checked: false
                })
            })
    }
    function newUser(){
        //need to change currentUserObj checked values with the checkedState values
        setCurrentUserObj((prevState) => ({
            Username: currentTurn,
            itemsSelected: prevState.itemsSelected.map((item, i) => {
                if (checkedState[i] === true) item.checked = true
            })
        }))
        //will be used to store current username and what they've ticked as true, will be passing it until we display totals
        setCompleted((completedUsers) => [...completedUsers, currentUserObj]);

        //check if we are at the end of the roooad
        // if()

        //then reset checkedState
        setCheckedState(new Array(dummyData.itemsList.length).fill(false))
        //also need to change currentTurn to the next person in the array, indexOf current? switch to variable for index?
        setTurn((prevUser) => data[data.indexOf(prevUser) + 1])
        //also need to clear/reset currentUserObj
        defaultUserObj.Username = data[data.indexOf(currentTurn) + 1]
        setCurrentUserObj(defaultUserObj);

        //clear checks
        const boxesToClear = document.getElementsByClassName('checkBox');
        for(let i = 0; i < boxesToClear.length; i++){
            boxesToClear[i].checked = false;
        }
        console.log('completed')
    }
    ////////////////////////////
    console.log(checkedState)
    console.log(currentUserObj)
    console.log(currentTurn)
    console.log(completedUsers)

    //LETS FUCKING GO!!!
    useEffect(() => {
        if(completedUsers.length === data.length) {
            let total = 0
            dummyData.itemsList.forEach(item => {
                total += item.itemPrice
            })
            navigate('/TipAmount', {state: { userData: completedUsers, tax: dummyData.tax, total: total }})
        }
    }, [currentUserObj]);

    return (  
        <>
            <h1>It is {currentTurn}'s turn</h1>
            <div className='usersContainer'>
                {data.map(user => <UserBubble username={user} key={user} />)}
            </div>
            <div className='itemsContainer'>

                {dummyData.itemsList.map((item, i) => {
                    return (
                        <div className="itemSet" key={i}>
                            <input type="checkbox" 
                            id={i} 
                            name={item.itemName} 
                            className='checkBox' 
                            label='unchecked' 
                            onChange={() => boxTicker(i)}
                            /><p>{item.itemName}</p><p>{item.itemPrice}</p>
                        </div>
                    )
                })}

            </div>
            <button onClick={newUser}>im done lol</button>
        </>
    );
}

export default ItemSelector;