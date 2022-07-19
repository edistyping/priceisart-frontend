import React, { useState } from 'react';
import './Ranking.css';

function Ranking(props) {
    // Show top 20 most voted imgaes 

    /*
        1. 
    */
    async function getTopImages(n) {

        // fetch(url, )
        const url = "https://priceisart-app.herokuapp.com/postgres/api2/"
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
          });

        var tempobject = {
            name: "name",
            url: ""
        }          

    }

    return (
        <div className="container-ranking">

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