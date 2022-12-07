import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/TipAmount.css'
import { useNavigate } from 'react-router-dom';


function TipAmount() {
    // tip ref
    const inputRef = useRef(null);
    // tip state
    const [tip, setTip] = useState(0);
    //state passed from ItemSelector via React Router
    const { state } = useLocation();
    const { userData, tax, total } = state;

    const navigate = useNavigate();

    //almost perfect rounding to two decimals, can be off a cent
    const totalBeforeTax = Math.round(total * 100) / 100
    
    const calcTip = (amt) => {
        console.log(amt);
        const result = totalBeforeTax * amt;
        setTip(result);

    }

    useEffect(() => {
        
        navigate('/FinalDisplay', {state: { userData, total: totalBeforeTax,  }})
    }, [tip]);
    
    return (
        <>
            <h1>How much are you expecting to Tip?</h1>
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
                <button onClick={() => calcTip(inputRef.current.value)}>Custom Tip</button>
            </div>  
        </>
    );
}

export default TipAmount;