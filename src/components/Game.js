import React, { useState, useEffect } from 'react';
import './Game.css';


/*
    Display a pair of images at a time up to 5 times. 
*/
function Game(props) {
    
    const artworks = props.artworks;
    const artworks_image = props.images; 
    const order = props.order; 
    const numberOfImages = order.length;
    
    const [index, setIndex] = useState(0);
    const [userResponses, setUserResponses] = useState([]);

    // Save user's selection to 'UserRespnose' and send it to Parent once all 5 are made
    function handleSelect(e) {
        e.preventDefault();
        var choice= e.target.id;

        if (index >= numberOfImages - 2) {  
            var data = userResponses;
            data.push(choice);
            props.handleGameOver(data);
            setIndex(0);
            setUserResponses([]);
        } else {            
            setUserResponses(prevArray => [...prevArray, choice])
            setIndex(index => index + 2);
        }    
    }    

    return (
        <div>
            <div className="Game">
                <div className="container-images" >
                    <div className="section-image" onClick={handleSelect} id={[order[index]]} >
                        <h3><i>{artworks[order[index]].id} {artworks[order[index]].name}</i> {artworks[order[index]].artist} {artworks[order[index]].year} </h3>
                        <img key={index} src={artworks_image[order[index]].src} alt="left one"></img>
                    </div>
                    <div className="section-image" onClick={handleSelect} id={[order[index + 1]]} >
                        <h3><i>{artworks[order[index + 1]].name}</i> {artworks[order[index + 1]].artist} {artworks[order[index + 1]].year} </h3>
                        <img key={index + 1} src={artworks_image[order[index + 1]].src} alt="right one"></img>
                    </div>
                </div>            
            </div>
        </div>
        
    );
}

export default Game;