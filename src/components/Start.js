import React, { useState } from 'react';
import './Start.css';
import { useNavigate , Link } from "react-router-dom";

/*
    1. Start button is clicked and runs a function
    2. Hide START and display Loading div
    3. Start Retrieving arts and wait for response
    4. Start the game if successful. Show Error message if no data 
 */


const Start = props => {
    const [loading, setLoading] = useState(0);
    const navigate = useNavigate()

    async function handleStart() {
        setLoading(1); // No need to update this. Once loadGame() is finished, just route to Game.js

        // Load everything (artworks, first 4 images)
        await props.loadGame();
        // navigate('/game');
    }

    function compareArtworks(artwork1, artwork2) {
        let artwork1_value = 0;
        let artwork2_value = 1;

        if (artwork1_value > artwork2_value)
            return 1;
        else 
            return 0;

    }

    // !!! Submit user's responses to Server
    async function handleSubmitResponse() {
        try {
            // const url = 'http://localhost:3000/artworks'
            const url = 'http://localhost:3000/response'
            
            const data = [{ artwork_id: 1, other_artwork_id: 2, user_id: 3, win: compareArtworks(1, 2) }, {artwork_id: 11, other_artwork_id: 22, user_id: 33, win: true}, {artwork_id: 11111, other_artwork_id: 2222, user_id: 33, win: true}];
            const res = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
        }
        catch(error) {
            console.log("Error occurred in reading...")
            console.log(error);
        }
    }
    // !!! Submit user's responses to Server
    async function handleSubmitVote() {
        try {
            // const url = 'http://localhost:3000/artworks'
            const url = 'http://localhost:3000/vote'
            
            const data = [{count: 1, win: compareArtworks(1, 0), artwork_id: 1}, {count: 2, win: compareArtworks(1, 2), artwork_id: 2}, {count: 2, win: compareArtworks(1, 2), artwork_id: 999}];
            const res = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
        }
        catch(error) {
            console.log("Error occurred in reading...")
            console.log(error);
        }
    }

    const divStyle = {
        color: 'yellow',
        width: '50px',
        height: '100px',
        fontSize: '15px',
    };
  return (
        <div className="container-begin"> 

            <button onClick={handleSubmitResponse} style={{width:"auto", height: "100px"}}>TEST</button>
            <button onClick={handleSubmitVote} style={{width:"auto", height: "100px"}}>TEST2</button>
            
            <button onClick={handleStart} style={divStyle}>START2</button> <br/>


            <div className="container-begin-start">
                <button className="button-75" onClick={handleStart} >
                    <div className={loading === 0 ? "content-start":"content-blank"} >
                        <Link to="/game" style={divStyle} disabled >Game{props.isDataLoaded}</Link>
                    </div>

                    <div className={loading === 1 ? "content-loading":"content-blank"} >
                        <div className="content-loading-top">
                            <p id="text-gamerule">Prepare to Choose 5 Appealing Artworks</p>
                        </div>
                        <div className="content-loading-bottom">
                            <img src={require('../assets/images/bobross.gif')} alt="Loading Icon" id="img-bobross"  />
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