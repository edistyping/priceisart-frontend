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
  
    var result2 = [];
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
        result2.push(parseInt(left_id))
      } else if (right_id === userResponse && left_price < right_price) {
        total++;
        result.push("Correct");
        result2.push(parseInt(right_id))
      } else {
        result.push("Incorrect");
        result2.push(-1);
      }
    }
    
    setTotalCorrectAnswer(total);
    setCorrectAnswers(result2);
    return result;
  }

  // Submitting data. API will do its own thing and adding or incrementing exisitng one 
  function prepareDataForSubmit() {
    console.log("prepareDataForSubmit()....");
    const artworks = props.artworks;
    const order = props.order;
    const userResponses = props.userResponses;
    
    // Use artwork_id, count, win; count == they were clicked
    var inputData = [];
    var i = 0;
    for (i = 0; i < userResponses.length; i++) {
      var objectLeft = {
        artworks_id: artworks[order[i * 2]].id,
        counts: 1,
        win: correctAnswers[i] === order[i * 2] ? 1:0 
      }
      var objectRight = {
        artworks_id: order[i * 2 + 1],
        counts: 1,
        win: correctAnswers[i] === order[i * 2 + 1] ? 1:0 
      }
      inputData.push(objectLeft, objectRight);      
    }

    console.log("inputting data.....")
    console.log(inputData);
    
    const preurl = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://127.0.0.1:8000/postgres/":"https://priceisart-app.herokuapp.com/postgres/"; 
    //const preurl = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "https://priceisart-app.herokuapp.com/postgres/":"https://priceisart-app.herokuapp.com/postgres/"; 
    const url = preurl + 'submit/'
    const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData)
    };

    console.log("url: " + url);

    fetch(url, requestOptions)
    .then(response => {
      if (response.ok){
        console.log("Submitted successfully...")
        setSubmitted(1);
      }
      else {
        console.log("Encountered error...")
      }
    })
    .catch(error => {
      console.log("Error when submitting the response!")
      throw new Error("HTTP error " + error);  // ***
    });    

    // Update IsSubmittedButton();
    props.handleSubmit()
  }

  useEffect(() => {
    // This useEffect acts as componentDidMount
    // It will only run once when the component mounts, since 
    // the dependency array is empty 
    checkCorrectAnswers(artworks, order, userResponses); 
  }, []);

  const artworks = props.artworks;
  const artworks_image = props.artworks_image;
  const userResponses = props.userResponses;
  const order = props.order;
  const numberOfQuestions = userResponses.length;
  const [totalCorrectAnswer, setTotalCorrectAnswer] = useState(0); // ex: 7 out of 10 => 7
  const [correctAnswers, setCorrectAnswers] = useState([]); // ex: ['Correct','Incorrect', ...]
  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(props.isDataSubmitted);

  return (
    <div className="container-result">

      <div className="container-result-options">
        <div className="container-result-option">
          <button onClick={props.handleReplay}>REPLAY</button>
        </div>
        <div className="container-result-option">
          <h2>Correct Answers: {totalCorrectAnswer} / { numberOfQuestions } </h2>
        </div>
        <div className="container-result-option">
          <button disabled={submitted} id="submit" onClick={prepareDataForSubmit}>SUBMIT YOUR RESPONSE</button> 
        </div>
      </div>

      <div className="container-result-body">
      
        <div className="wrapper-result">
            {(() => {
              let result = [];
              for (let i = 0; i < numberOfQuestions; i++) {
                result.push(
                  <div className="content-result" key ={i} >
                  
                    {/*
                      <h2>{correctAnswers[i]} {userResponses[i]}| L: {order[i * 2]} R: {order[i * 2 + 1]} </h2> 
                      {typeof(userResponses[i])} | {typeof(order[i * 2])}
                      <p>{ (correctAnswers[i] === "Correct" && userResponses[i] === order[i * 2].toString()) ? "passed": "not passed" }</p>
                    */}
                    
                      <div className="content-result-body" style={{ border: (correctAnswers[i] === order[i * 2] ? "solid 15px lime" : (correctAnswers[i] === -1 && userResponses[i] === order[i * 2].toString() ) ? "solid 15px red" : "")}} >
                        <div className="content-result-header">
                          <h3><i>{artworks[order[i * 2]].name}</i> By {artworks[order[i * 2]].artist} </h3>
                          <h4>${parseFloat(artworks[order[i * 2]].adjusted_price)} Million </h4>
                        </div>
                        <div className="content-result-image" >
                          <img key={order[i * 2]} src={artworks_image[order[i * 2]].src} />
                        </div>
                      </div>

                      <div className="content-result-body" style={{ border: (correctAnswers[i] === order[i * 2 + 1] ? "solid 15px lime" : (correctAnswers[i] === -1 && userResponses[i] === order[i * 2 + 1].toString() ) ? "solid 15px red" : "") }}>
                        <div className="content-result-header">
                          <h3><i>{artworks[order[i * 2 + 1]].name}</i> By {artworks[order[i * 2]].artist}</h3>
                          <h4>${parseFloat(artworks[order[i * 2 + 1]].adjusted_price)} Million</h4>
                        </div>
                        <div className="content-result-image" >
                          <img key={order[i * 2 + 1]} src={artworks_image[order[i * 2 + 1]].src} />
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
  )
}

export default Result;

