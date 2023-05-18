import React from 'react';
import './Header.css';

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

    function switchToResult() {
        props.handleGameOver();
    }
    function switchToRanking() {
        props.handleShowRanking(0);
    }

    return (
        <div className={containerHeader}>
            <h1>PRICE IS ART!</h1>           
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
