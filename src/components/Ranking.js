import React, { useState } from 'react';
import './Ranking.css';

function Ranking(props) {
    // Show top 20 most voted imgaes 
    return (
        <div className="container-ranking">

            <div className="container-ranking-header">
                <h1>Price is Art!</h1>
                <p id="resultButton" >Back to Result</p>
            </div>
            
            <div className="container-ranking-body">
                <h2>Top 10</h2>
                <div className='content-ranking'>
                    <div className='content-ranking-wrapper'>
                        <div className='content-ranking-left'>
                            img
                        </div>
                        <div className='content-ranking-right'>
                            name + stats 
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Ranking;