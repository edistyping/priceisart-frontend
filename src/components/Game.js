import React, { useState } from 'react';
import './Game.css';

function Game(props) {

    const artworks = props.artworks;
    const artworks_image = props.images; 
    const order = props.order; 
    const numberOfImages = 10;
    const [index, setIndex] = useState(0);
    const [userResponses, setUserResponses] = useState([]);

    // Add the choice to userResponse
    function handleSelect(e) {
        e.preventDefault();

        var choice= e.target.id;
        // right now, it's left to right. change it to the art id 

        var tempResponse = userResponses;
        tempResponse.push(choice);
        setUserResponses(tempResponse);

        // When the game is finished (index), show Result page 
        if (index >= numberOfImages - 2) {
            setIndex(0);
            props.handleGameOver(userResponses);
        } else {
            setIndex(index => index + 2);
        }
    }    

    return (
        <div className="Game">
    
            <div className="container-header"> 
                {index / 2 + 1} / {numberOfImages / 2}
            </div>

            {
            (artworks.length > 0 && index <= numberOfImages - 2) &&
            <div className="container-images" >
                <div className="section-image" onClick={handleSelect} id={[order[index]]} >
                    <h3>  {artworks[order[index]].id} <i>{artworks[order[index]].name}</i> {artworks[order[index]].artist} {artworks[order[index]].year} </h3>
                    <img key={index} src={artworks_image[order[index]].src} alt="left one"></img>
                </div>

                <div className="section-image" onClick={handleSelect} id={[order[index + 1]]} >
                    <h3>   {artworks[order[index + 1]].id} <i>{artworks[order[index + 1]].name}</i> {artworks[order[index + 1]].artist} {artworks[order[index + 1]].year} </h3>
                    <img key={index + 1} src={artworks_image[order[index + 1]].src} alt="right one"></img>
                </div>
            </div>                       
            }
        </div>
    );
}

export default Game;