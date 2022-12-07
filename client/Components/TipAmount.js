import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/TipAmount.css'

function TipAmount() {
    // tip ref
    const inputRef = useRef(null);
    // tip state
    const [tip, setTip] = useState(0);
    //state passed from ItemSelector via React Router
    const { state } = useLocation();
    const { userData, tax, total, imageData } = state;
    const [selected, setSelected] = useState(false);
    const navigate = useNavigate();

    //almost perfect rounding to two decimals, can be off a cent
    const totalBeforeTax = Math.round(total * 100) / 100
    
    const calcTip = (amt) => {
        // console.log(amt);
        // const result = totalBeforeTax * amt;
        const result = Math.round((totalBeforeTax * amt) * 100) / 100
        setTip(result);
    }
    const customTip = (input) => {
        setTip(input);
    }

    const selectClick = () => {
        setSelected(true)
    }

    useEffect(() => {
        if(selected) navigate('/FinalDisplay', {state: { userData: userData, total: totalBeforeTax, tip: tip, tax: tax, imageData: imageData.itemsList }})
    }, [selected]);
    
    return (
        <div className='tipAmountWholePage'>
            <h1 className="tipAmount">Select Tip Amount</h1>
            <h1 className="currentTip">Your current tip: {tip} </h1>
            <div className='tipButtons'>
                <button className='coolButton' onClick={() => calcTip(.15)}>15%</button>
                <button className='coolButton' onClick={() => calcTip(.18)}>18%</button>
                <button className='coolButton' onClick={() => calcTip(.20)}>20%</button>
            </div>
            <div className='customAmount'>
                <input ref={inputRef} 
                type='text' 
                id='customTip' 
                name='customTip'
                />
                <button className='confirmButton' style={{height:'8vh', width: '20vw'}} onClick={() => customTip(inputRef.current.value)}>Custom Tip</button>
            </div>  
            <div className='confirm'>
                <button className='confirmButton' onClick={selectClick}>Confirm</button>
            </div>
        </div>
    );
}

export default TipAmount;