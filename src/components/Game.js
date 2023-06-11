import React, { useState } from 'react';
import './Game.css';


/*
    Display a pair of images at a time up to 5 times. 
*/
function Game(props) {

    const artworks = props.artworks;
    const artworks_image = props.images; 
    const order = props.order; 
    const numberOfImages = 10;
    const [index, setIndex] = useState(0);
    const [userResponses, setUserResponses] = useState([]);

    console.log(`hi: ${numberOfImages} - ${artworks_image.length}`)

    // Save user's selection to 'UserRespnose' and send it to Parent once all 5 are made
    function handleSelect(e) {
        e.preventDefault();

        var choice= e.target.id;
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
            {
            (artworks.length > 0 && index <= numberOfImages - 2) &&
            <div className="container-images" >
                <div className="section-image" onClick={handleSelect} id={[order[index]]} >
                    <h3><i>{artworks[order[index]].name}</i> {artworks[order[index]].artist} {artworks[order[index]].year} </h3>
                    <img key={index} src={artworks_image[order[index]].src} alt="left one"></img>
                </div>

                <div className="section-image" onClick={handleSelect} id={[order[index + 1]]} >
                    <h3><i>{artworks[order[index + 1]].name}</i> {artworks[order[index + 1]].artist} {artworks[order[index + 1]].year} </h3>
                    <img key={index + 1} src={artworks_image[order[index + 1]].src} alt="right one"></img>
                </div>
            </div>                       
            }
        </div>
    );
}

export default Game;