import React, { useState } from 'react';
import './Start.css';

/*
    1. Start button is clicked and runs a function
    2. Hide START and display Loading div
    3. Start Retrieving arts and wait for response
    4. Start the game if successful. Show Error message if no data 
 */
const Start = props => {
    const [loading, setLoading] = useState(false);
    function handleStart() {
        props.handleStart();
        setLoading(true);
    }

  return (
        <div>
            <div className="container-begin"> 
                <div className="container-begin-start">
                <button className="button-75" onClick={handleStart} >
                <div className={!loading ? "content-start":"content-blank"} >
                {
                    <p>START</p>
                }    
                </div>
                
                <div className={loading ? "content-loading":"content-blank"} >
                <div className="content-loading-top">
                <p id="text-gamerule">Prepare to Choose 5 Appealing Artworks</p>
                </div>
                <div className="content-loading-bottom">
                <img src={require('../static/images/bobross.gif')} alt="Loading Icon" id="img-bobross"  />
                <p id="text-loading">Loading...</p>
                </div>
                </div>
                    </button>
                </div>
                
                <div className="content-filler">
                </div>
            </div>
        </div>

    )

}

export default Start;