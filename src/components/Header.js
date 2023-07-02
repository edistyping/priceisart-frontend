import React, { useState } from 'react';
import './Header.css';

import LoginSignUp from '../auth/LoginSignUp';

function Header(props) {

    /*
    // Start: height in container-header increases 
    
    // Game: index and numberOfImages        
        - Use a state variable from App to keep track of currentQuiz

    // Result: Show Ranking
        
    // Ranking: Back to Result
        - Build a API for Top 10 Arts
    */
    const currentView = props.currentView;
    const containerHeader = (currentView === "Start" ? "container-header-start":"container-header-others") 

    const [login, setLogin] = useState(0);
    const [user, setUser] = useState({});

    function loginUser(data) {
        console.log('handleLogin() called....');
        console.log(data);
        console.log(data.user);
        console.log(data.accessToken);
        // save data.accessToken to localStorage/sessionStorage
        setUser(data);
        setLogin(true);
        props.handleLogin(data);
    };
    function handleSignout() {
        console.log('handleSignout() called....');
        console.log(user);
        console.log(typeof user);   
        window.sessionStorage.removeItem("accessToken");
        setLogin(false);
        setUser({})
    };


    function switchToResult() {
        props.handleGameOver();
    }
    function switchToRanking() {
        props.handleShowRanking();
    }
    return (
        <div className={containerHeader}>
            <h1>PRICE IS ART!</h1>          
            <LoginSignUp preurl={props.preurl} handleLogin={loginUser} handleSignout={handleSignout} activated={login} /> 

            {(() => {
                switch(currentView) {
                    case 'Start':
                        break;
                    case 'Game': 
                        break;
                    case 'Result':
                        return <button id="rankingButton" onClick={switchToRanking}>Ranking</button>;
                    case 'Ranking':
                        return <button id="resultButton" onClick={switchToResult} >Back to Result</button>;
                    default: 
                        return null; 
                }
                }).call(this)
            }
        </div>
    );
}

export default Header;
