import React, { useState, useEffect } from 'react';
import DisplayAnswers from './DisplayAnswers';
import './Result.css';

function Result(props) {

  // 'Post' request: Push the data to database
  function handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit is clicked");
  }

  // artworks, order, userResponse
  // count winning and update total wins 
  function checkCorrectAnswers(var_artworks, var_order, var_userResponses) {
    var result = [];
    const artworks = var_artworks;
    const order = var_order;
    const userResponses = var_userResponses;
  
    // check if the user choice is correct 
    var i, total = 0;
    for (i = 0; i < userResponses.length; i++) {
      const left_id = order[i * 2].toString();
      const right_id = order[i * 2 + 1].toString();
      const left_price = parseInt(artworks[order[i * 2]].adjusted_price, 10);
      const right_price = parseInt(artworks[order[i * 2 + 1]].adjusted_price, 10);
      const userResponse = userResponses[i];

      if (left_id === userResponse && left_price >= right_price) {
        total++;
        result.push("Correct");
      } else if (right_id === userResponse && left_price < right_price) {
        total++;
        result.push("Correct");
      } else {
        result.push("Incorrect");
      }
    }
    
    setTotalCorrectAnswer(total);
    setCorrectAnswers(result);
    return result;
  }

  function prepareDataForSubmit() {
    // Submit data to Postgres
    /*
    console.log("Inside handleSubmit()");
    e.preventDefault();

    // Use artworks_list and artworks_choice
    const artworks = this.state.artworks_list;
    const choices = this.state.artworks_choice;
    const artworks_order = this.state.artworks_order;

    var temp = [];
    var i = 0
    for (i = 0; i < choices.length; i++) {
      var objectLeft = {
        id: artworks[artworks_order[i * 2]].id,
        counts: 1,
        win: 0,
        loss: 0, 
        selected: 0,
        artwork_id: artworks[artworks_order[i * 2]].id,
      }
      var objectRight = {
        id: artworks[artworks_order[i * 2 + 1]].id,
        counts: 1,
        win: 0, 
        loss: 0, 
        selected: 0,
        artwork_id: artworks[artworks_order[i * 2 + 1]].id,
      }

      if (artworks[artworks_order[i * 2]].adjusted_price > artworks[artworks_order[i * 2 + 1]].adjusted_price && choices[i] === "0") {
        objectLeft.win++;
      } else if (artworks[artworks_order[i * 2]].adjusted_price < artworks[artworks_order[i * 2 + 1]].adjusted_price && choices[i] === "1") {
        objectRight.win++;
      }
      
      if (choices[i] === "0")
        objectLeft.selected++;
      else if (choices[i] === "1")
        objectRight.selected++;

      temp.push(objectLeft, objectRight);      
    }


    var url = this.state.preurl + 'submit/'
    const requestOptions = {
      method: 'PUT',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(temp)
    };
    fetch(url, requestOptions)
    .then(response => {
      if (response.ok){
        console.log("Submitted successfully...")
      }
      else {
        console.log("Encountered error...")
      }
    })
    .catch(error => {
      console.log("Error when submitting the response!")
      throw new Error("HTTP error " + error);  // ***
    });    
     
     
     */
  }

  useEffect(() => {
    // This useEffect acts as componentDidMount
    // It will only run once when the component mounts, since 
    // the dependency array is empty 
    console.log('mount');
    checkCorrectAnswers(artworks, order, userResponses); 
  }, []);

  const artworks = props.artworks;
  const artworks_image = props.artworks_image;
  const userResponses = props.artworks_userResponse;
  const order = props.order;
  const numberOfQuestions = userResponses.length;
  const [totalCorrectAnswer, setTotalCorrectAnswer] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [index, setIndex] = useState(0);

  return (
    <div className="container-result">

      <div className="container-result-header">
        <h2>Price is Art!</h2>
      </div>

      <div className="container-result-options">
        <button onClick={props.handleReplay}>REPLAY</button>
        <button id="submit" onClick={handleSubmit}>SUBMIT YOUR RESPONSE</button> 
      </div>

      <div className="container-result-content">
        <h2>Correct Answers: {totalCorrectAnswer} / { numberOfQuestions } </h2>
      
        <div className="content-wrapper">

            { 
              (() => {
                let result = [];
                for (let i = 0; i < numberOfQuestions; i++) {
                  result.push(
                    <div className="content-result">
                      <div className="content-result-left">
                          <h3>{artworks[order[i * 2]].id} {artworks[order[i * 2]].name}</h3>
                          <h3>${artworks[order[i * 2]].adjusted_price}</h3>
                          <img key={order[i * 2]} src={artworks_image[order[i * 2]].src} />
                      </div>
                      <div className="content-result-answer">
                          {correctAnswers[i]}
                      </div>
                      <div className="content-result-right">
                          <h3>{artworks[order[i * 2 + 1]].id} {artworks[order[i * 2 + 1]].name}</h3>
                          <h3>${artworks[order[i * 2 + 1]].adjusted_price}</h3>
                          <img key={order[i * 2+ 1]} src={artworks_image[order[i * 2 + 1]].src} />
                      </div>
                    </div>



                  );
                }
                return result;
              })()
            }
        </div>

      </div>

    </div>
  )
}

export default Result;

