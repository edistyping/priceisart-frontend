import React, { useEffect, useState } from 'react';
import './Header.css';

import LoginSignUp from '../auth/LoginSignUp';

function Header(props) {

    console.log(`Header.js here....`);
    const currentView = props.currentView;
    const containerHeader = (currentView === "Start" ? "container-header-start":"container-header-others") 
    
    console.log(currentView);
    const [login, setLogin] = useState(false);
    
    const [user, setUser] = useState(props.user);    
    // const user = props.user;
    console.log(user);

    useEffect(() => {
        console.log(`header useEffect() here...`);
        console.log(props.user);
        
        const isSigned = Object.keys(props.user).length !== 0;
        console.log(isSigned);
        console.log('----------------------------')
    }, [props.user]);


    function handleLogin(data) {
        console.log('(Header.js) handleLogin() called....');
        props.handleLogin(data);
        setLogin(true);
    };
    function handleSignout() {
        console.log(`handleSignout() called....`);
        setLogin(false);
        props.handleLogout();
    };


    function switchToResult() {
        props.handleGameOver();
    }
    function switchToRanking() {
        props.handleShowRanking();
    }
    return (
        <div key={props.user} className={containerHeader}>
            <h1>{login.toString()}PRICE IS ART!</h1>          
            <LoginSignUp user={props.user} preurl={props.preurl} handleLogin={handleLogin} handleSignout={handleSignout} /> 
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
            }).call(this)}
        </div>
    );
}

export default Header;
