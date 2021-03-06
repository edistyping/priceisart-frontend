import React, { useState } from 'react';
import './Start.css';


const Start = props => {

    /*
        1. Start button is clicked and runs a function
        2. Hide START and display Loading div
        3. Start Retrieving arts and wait for response
        4. Start the game if successful. Show Error message if no data 
     */
    const [loading, setLoading] = useState(0);

    function handleStartTest() {
        
        // Phase 1 and 2 done here
        setLoading(1);

        // Phase 3 and 4 but leads to error
        // What happens if the images are not loaded?
        props.handleStart();

    }

    return (
        <div className="container-begin"> 
        {loading}
            <div className="container-begin-start">
                <button className="button-75" onClick={handleStartTest} >
                    <div className={loading === 0 ? "content-start":"content-blank"} >
                        <p>START{props.isDataLoaded}</p>
                    </div>

                    <div className={loading === 1 ? "content-loading":"content-blank"} >
                        <div className="content-loading-top">
                            <p id="text-gamerule">Prepare to Choose 5 Appealing Artworks</p>
                        </div>
                        <div className="content-loading-bottom">
                            <img src={require('../bobross.gif')} alt="Loading Icon" id="img-bobross"  />
                            <p id="text-loading">Loading...</p>
                        </div>
                    </div>
                </button>
            </div>

            <div className="content-filler">
            </div>

        </div>
    )
}

export default Start;