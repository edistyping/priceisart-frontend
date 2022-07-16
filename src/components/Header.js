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

    return (
        <div className={containerHeader}>
            <h1>Price is Art!</h1>           
                {(() => {
                    switch(currentView) {
                        case 'Start':
                            break;
                        case 'Game': 
                            return <h2> {/* <h3>{index / 2 + 1} / {numberOfImages / 2}</h3> */}</h2>; 
                        case 'Result':
                            return <p id="resultButton" onClick={props.handleShowRanking}>Ranking</p>;
                        case 'Ranking':
                            return <p id="resultButton" onClick={props.handleShowRanking}>Back to Result</p>;
                        default: 
                            return null; 

                    }
                    }).call(this)
                }
                       
        </div>
    );
}

export default Header;