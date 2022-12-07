import React from 'react';
import '../Styles/UserBubbles.css';

const colors = [
    '#d15a36',
    '#892bd6',
    '#75b53e',
    '#c7ed5f',
    '#5fed66',
    '#5feddf',
    '#5fa1ed',
    '#645fed',
    '#be5fed',
    '#ed5fbb',
]

function UserBubble(props) {
    let padding;
    if(props.location === 'AddUsers') padding = 'addUsersPage'
    if(props.location === 'ItemSelector') padding = 'itemSelectorPage'
    if(props.location === 'FinalDisplay') padding = 'FinalDisplay' 
    let currentTurn;
    if (props.currentTurn){
        if (props.currentTurn === props.username || currentTurn === true) currentTurn = true;
    }

    return (
        <div className={padding}>
            <div className="userBubble" style={{backgroundColor: `${colors[props.index]}`, fontSize: `${props.location === 'ItemSelector' ? '17px' : '25px'}`, opacity: `${currentTurn || props.location === 'AddUsers' || props.location === 'FinalDisplay' ? '100%' : '60%'}`}}>{props.username}</div>
        </div>  
    );
}

export default UserBubble;