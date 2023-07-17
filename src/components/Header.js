import React from 'react';
import './Header.css';

import LoginSignUp from '../auth/LoginSignUp';

function Header(props) {

    const currentView = props.currentView;
    const containerHeader = (currentView === "Start" ? "container-header-start":"container-header-others") 
    
    function handleLogin(data) {
        props.handleLogin(data);
    };     
    function handleSignout() {
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
            <h1>PRICE IS ART!</h1>          
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
