import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserBubble from './UserBubbles';
import '../Styles/ItemSelector.css';
import { useNavigate } from 'react-router-dom';

function ItemSelector() {
  //for props passed from AddUsers via React Router on click
  const location = useLocation();
  const { userData, imageData } = location.state;
  // console.log(data)
  console.log(userData);
  console.log(imageData);
  //Navigation when finished (above return)
  const navigate = useNavigate();

  //hook city
  const [checkedState, setCheckedState] = useState(
    new Array(imageData.itemsList.length).fill(false)
  );
  const [currentTurn, setTurn] = useState(userData[0]);
  const [currentUserObj, setCurrentUserObj] = useState({
    Username: currentTurn,
    itemsSelected: imageData.itemsList.map((item) => {
      return {
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        checked: false,
      };
    }),
  });
  const [completedUsers, setCompleted] = useState([]);
  function boxTicker(position) {
    setCheckedState(
      checkedState.map((bool, i) => {
        if (i === position) bool = !bool;
        return bool;
      })
    );
  }
  ///////////////////////////////
  const defaultUserObj = {
    Username: currentTurn,
    itemsSelected: imageData.itemsList.map((item) => {
      return {
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        checked: false,
      };
    }),
  };
  function newUser() {
    //need to change currentUserObj checked values with the checkedState values
    setCurrentUserObj((prevState) => ({
      Username: currentTurn,
      itemsSelected: prevState.itemsSelected.map((item, i) => {
        if (checkedState[i] === true) item.checked = true;
      }),
    }));
    //will be used to store current username and what they've ticked as true, will be passing it until we display totals
    setCompleted((completedUsers) => [...completedUsers, currentUserObj]);

    //check if we are at the end of the roooad
    // if()

    //then reset checkedState
    setCheckedState(new Array(imageData.itemsList.length).fill(false));
    //also need to change currentTurn to the next person in the array, indexOf current? switch to variable for index?
    setTurn((prevUser) => userData[userData.indexOf(prevUser) + 1]);
    //also need to clear/reset currentUserObj
    defaultUserObj.Username = userData[userData.indexOf(currentTurn) + 1];
    setCurrentUserObj(defaultUserObj);

    //clear checks
    const boxesToClear = document.getElementsByClassName('checkBox');
    for (let i = 0; i < boxesToClear.length; i++) {
      boxesToClear[i].checked = false;
    }
    console.log('completed');
  }
  ////////////////////////////
  console.log(checkedState);
  console.log(currentUserObj);
  console.log(currentTurn);
  console.log(completedUsers);

  //LETS FUCKING GO!!!
  useEffect(() => {
    if (completedUsers.length === userData.length) {
      let total = 0;
      imageData.itemsList.forEach((item) => {
        total += item.itemPrice;
      });
      navigate('/TipAmount', {
        state: { userData: completedUsers, tax: imageData.tax, total: total },
      });
    }
  }, [currentUserObj]);

  return (
    <div className='selectorPage'>
      <h1 className='header'>It is {currentTurn}'s turn</h1>
      <div className='usersContainer'>
        {userData.map((user, i) => (
          <UserBubble
            username={user}
            key={user}
            location={'ItemSelector'}
            index={i}
            currentTurn={currentTurn}
          />
        ))}
      </div>
      <div className='itemsContainer'>
        {imageData.itemsList.map((item, i) => {
          return (
            <>
              <div className='itemSet' key={i}>
                <input
                  type='checkbox'
                  id={i}
                  name={item.itemName}
                  className='checkBox'
                  label='unchecked'
                  onChange={() => boxTicker(i)}
                />
                <p className='itemNames'>{item.itemName}</p>
                {completedUsers.map((user) => {
                  let count = 0;
                  return user.itemsSelected.map((userItem) => {
                    if (
                      userItem.checked === true &&
                      user.itemsSelected.indexOf(userItem) ===
                        imageData.itemsList.indexOf(item)
                    ) {
                      return (
                        <div>
                          <UserBubble
                            username={user.Username}
                            key={`${user.Username}${user.itemsSelected.indexOf(
                              userItem
                            )}`}
                            location={'ItemSelector'}
                            index={count++}
                            currentTurn={true}
                          />
                        </div>
                      );
                    }
                  });
                })}
                <p className='prices'>{item.itemPrice}</p>
              </div>
              <div className='seperator'></div>
            </>
          );
        })}
      </div>
      <div className='footer'>
        <button className='finished' onClick={newUser}>
          IM DONE
        </button>
      </div>
    </div>
  );
}

export default ItemSelector;
