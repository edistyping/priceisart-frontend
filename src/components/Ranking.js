import React, { useState, useEffect  } from 'react';
import './Ranking.css';


/*
    Receive artworks info and images to display top 10    
*/
function Ranking(props) {
    
    const artworks = props.artworks;
    const artworks_image = props.artworks_image;
    const artworks_top = props.artworks_top;
    const order = artworks_top.map(a => a.artworks);

    return (
        <div className="container-ranking">

            <div className="container-ranking-body">
                
                <div className='content-ranking'>
                    <div className='content-ranking-header'>
                        <h2>10 Most Clicked Artworks</h2>
                    </div>
                    {order.map((i, index) => (
                        <div key={index} className='content-ranking-wrapper'>
                            <div className='content-ranking-left'>

                                <img key="0" id="img-frame" src={require('../static/frames/frame1.png')} alt="frame"  />
                                <img key={i} src={artworks_image[i].src} alt="right one"></img>

                            </div>
                            <div className='content-ranking-right'>
                                <h3 id="name">{artworks[i].name}</h3> 
                                <p id="artistyear">{artworks[i].artist} in {artworks[i].year}</p>
                                <p id="dateofsale">Sold on {artworks[i].date_of_sale}</p>
                                <p id="price">${parseFloat(artworks[i].adjusted_price)} Millions</p>
                                <p id="counts"># Clicked: <span>{artworks_top[index].counts}</span></p> 
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>

        </div>
    );
}

export default Ranking;