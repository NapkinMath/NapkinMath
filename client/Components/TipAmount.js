import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/TipAmount.css'
function TipAmount() {
    //state passed from ItemSelector via React Router
    const { state } = useLocation();
    const { userData, tax, total } = state;
    
    //almost perfect rounding to two decimals, can be off a cent
    const totalVal = Math.round(total * 100) / 100

    return (
        <>
            <h1>How much are you expecting to Tip?</h1>
            <div className='tipButtons'>
                <button className='coolButton'>16%</button>
                <button className='coolButton'>18%</button>
                <button className='coolButton'>20%</button>
            </div>
            <div className='customAmount'>
                <input /><button>lol</button>
            </div>  
        </>
    );
}

export default TipAmount;