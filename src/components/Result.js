import React, { useState, useEffect } from 'react';
import './Result.css';

/*
  Purpose: This component is used for following things: 
*/
function Result(props) {

  // Configuring variables 
  const artworks = props.artworks;
  const artworks_image = props.artworks_image;
  const order = props.order;
  const userResponses = props.userResponses;
  const numberOfQuestions = order.length / 2;
  const currentView = props.currentView;

  const [totalCorrectAnswer, setTotalCorrectAnswer] = useState(0); // ex: 7 out of 10 => 7
  const [correctAnswers, setCorrectAnswers] = useState([]); // ex: ['Correct','Incorrect', ...]
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    checkCorrectAnswers(artworks, order, userResponses);
  }, [artworks, order, userResponses]);

  function handleSubmit() {
    // submitVote(); 
    submitResponse();
  }

  // 6/2023: Do I need this? 
  // Check and save correct answers and # of correct answers  
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
        result.push(parseInt(left_id))
      } else if (right_id === userResponse && left_price < right_price) {
        total++;
        result.push(parseInt(right_id))
      } else {
        result.push(-1);
      }
    }    
    setTotalCorrectAnswer(total);
    setCorrectAnswers(result);
    return [total, result];
  }

  // Submitting data. API will do its own thing and adding or incrementing exisitng one 
  function submitVote() {    
    var inputData = [];
    var i = 0;
    for (i = 0; i < userResponses.length; i++) {
      var objectLeft = {
        artwork_id: Number(artworks[order[i * 2]].id),
        count: 1,
        win: correctAnswers[i] === order[i * 2] ? 1:0 
      }
      var objectRight = {
        artwork_id: Number(artworks[order[i * 2 + 1]].id),
        count: 1,
        win: correctAnswers[i] === order[i * 2 + 1] ? 1:0 
      }
      inputData.push(objectLeft, objectRight);      
    }
        
    const preurl = props.preurl; 
    const url = preurl + '/artworks/vote'
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData)
    };
    fetch(url, requestOptions)
    .then(response => {
      if (response.ok){
        setSubmitted(true);
      }
      return response.json();
    }).then(result => {
        console.log(result);
    }) 
    .catch(error => {
      throw new Error("HTTP error " + error); 
    });    
  }

  function submitResponse() {
    const artworks = props.artworks;
    const order = props.order;
    const userResponses = props.userResponses;
    const user = Object.keys(props.user).length !== 0 ? props.user.user.id : 0;
 
    // prepare data 
    var inputData = [];
    for (let i = 0; i < userResponses.length; i++) {
      var temp = {
        artwork_id: Number(artworks[order[i * 2]].id),
        other_artwork_id: Number(artworks[order[i * 2 + 1]].id),
        user_id: user,
        win: artworks[order[i * 2]].adjusted_price > artworks[order[i * 2 + 1]].adjusted_price ? true : false 
      }
      inputData.push(temp);      
    }
    
    const preurl = props.preurl
    const url = preurl + '/artworks/response'
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData)
    };

    fetch(url, requestOptions)
    .then(response => {
      if (response.ok){
        setSubmitted(1);
      }
      return response.json();
    }).then(result => {
      console.log(result);
    }) 
    .catch(error => {
      console.log("Error when submitting the response!")
      throw new Error("HTTP error " + error);  // ***
    });    
  }

  return (
    <div>
      { currentView === "Result" && order ? 
        <div className="container-result">
          <div className="container-result-options">
            <div className="container-result-option">
              <button onClick={props.handleReplay}>REPLAY</button>
            </div>
            <div className="container-result-option">
              <h2>Correct Answers: {totalCorrectAnswer} / { numberOfQuestions } </h2>
            </div>
            <div className="container-result-option">
              <button disabled={submitted} id="submit" onClick={handleSubmit}>
                {  submitted === false ? "SUBMIT YOUR Vote" : "THANK YOU!" }
              </button> 
            </div>
          </div>

          <div className="container-result-body">
            <div className="wrapper-result">
            {(() => {
                  let result = [];
                  for (let i = 0; i < numberOfQuestions; i++) {
                    result.push(
                      <div className="content-result" key ={i} >
                        
                          <div className="content-result-body" style={{ border: (correctAnswers[i] === order[i * 2] ? "solid 10px lime" : (correctAnswers[i] === -1 && userResponses[i] === order[i * 2].toString() ) ? "solid 10px red" : "solid 10px inherit")}} >
                            <div className="content-result-header">
                              <h2><i>{artworks[order[i * 2]].name}</i></h2>
                              <h3> By {artworks[order[i * 2]].artist}</h3>
                              <h4>${parseFloat(artworks[order[i * 2]].adjusted_price)} Million </h4>
                            </div>
                            <div className="content-result-image" >
                              <img key={order[i * 2]} src={artworks_image[order[i * 2]].src} alt="left artwork"/>
                            </div>
                          </div>

                          <div className="content-result-body" style={{ border: (correctAnswers[i] === order[i * 2 + 1] ? "solid 10px lime" : (correctAnswers[i] === -1 && userResponses[i] === order[i * 2 + 1].toString() ) ? "solid 10px red" : "solid 10px inherit") }}>
                            <div className="content-result-header">
                              <h2><i>{artworks[order[i * 2 + 1]].name}</i></h2>
                              <h3> By {artworks[order[i * 2 + 1]].artist}</h3>
                              <h4>${parseFloat(artworks[order[i * 2 + 1]].adjusted_price)} Million</h4>
                            </div>
                            <div className="content-result-image" >
                              <img key={order[i * 2 + 1]} src={artworks_image[order[i * 2 + 1]].src} alt="right artwork" />
                            </div>
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
      : null
      }
    </div>
  )
}

export default Result;
