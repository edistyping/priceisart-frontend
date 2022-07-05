import React from 'react';

//const result = (choice, leftPrice, rightPrice) => {

const Result = props => {
    const leftPrice = parseFloat(props.leftPrice);
    const rightPrice = parseFloat(props.rightPrice);
    const choice = props.choice
    
    const h2Style = {
      fontSize: "2em",
      fontWeight: "bold"
    };

    if (leftPrice > rightPrice && choice === "0") {
      return <h2 style={h2Style}>Correct</h2>;
    } else if (leftPrice < rightPrice && choice === "1") {
      return <h2 style={h2Style}>Correct</h2>;
    } 
    else 
      return <h2 style={h2Style}>Incorrect</h2>;
  };

export default Result;