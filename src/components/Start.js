import React, { useState } from 'react';
import './Start.css';


/*
    1. Start button is clicked and runs a function
    2. Hide START and display Loading div
    3. Start Retrieving arts and wait for response
    4. Start the game if successful. Show Error message if no data 
 */


const Start = props => {
    const [loading, setLoading] = useState(0);

    function handleStart() {
        setLoading(1);
        props.handleStart();
    }

      // Call API to get Artworks data from Postgres
    async function handleStart2() {
        try {
            const url = 'http://localhost:3000/artworks'
            
            console.log(`Running readArtworks().... ${url}`)
            const res = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                'Content-Type': 'application/json'
                }
            });
            let res_json = await res.json();
            return res_json;
        }
        catch(error) {
            console.log("Error occurred in reading Artworks...")
            console.log(error);
        }
  }

  return (
        <div className="container-begin"> 

            <button onClick={handleStart2} style={{width:"auto", height: "100px"}}>TEST</button>

            <div className="container-begin-start">
                <button className="button-75" onClick={handleStart} >
                    <div className={loading === 0 ? "content-start":"content-blank"} >
                        {/*
                            <p>START{props.isDataLoaded}</p>
                        */}    
                        </div>

                    <div className={loading === 1 ? "content-loading":"content-blank"} >
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
    )
}

export default Start;