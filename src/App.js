import React, { Component } from "react";
import './App.css';

import Result from './components/Result';

const numberOfImages = 20; // Number of images to read from Azure Storage

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDataLoaded: false,
      appStart: false,

      index: 0, 

      preurl: (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://127.0.0.1:8000/postgres/":"https://priceisart-app.herokuapp.com/postgres/", 
      artworks_list: [],
      artworks_url: [],
      artworks_choice: [], // This shows selections made by users and each index will associate with arworks_list[i] and artworks_lists[i + 1[] 
      artworks_order: [], // This shows number of images to display to users 
      artworks_images: [],
          
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleReplay = this.handleReplay.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  async componentDidMount() {
    let result = await this.readArtworks();
    result.orders = this.shuffle(result.orders);
    await this.preload(result.urls, result.orders);
    this.setState({
      isDataLoaded: true,
      appStart: true,
      artworks_order: result.orders
    })
  }

  async readArtworks() {
    // Call API to get data from Postgres from Django
    var startTime = performance.now()
    try {

      console.log("Running readArtworks()....")
      const url = this.state.preurl + 'api1/'
      console.log("url: " + url);
      const res = await fetch(url);

      let res_json = await res.json();

      var arr_urls = [];
      var arr_temp = [];
      for (let i = 0; i < res_json.length; i++) {
        arr_urls.push(res_json[i].full_path)      
        arr_temp.push(i);
      }

      this.setState({
        artworks_list: res_json,
        artworks_url: arr_urls,
        artworks_order: arr_temp,
      })
      return {
        urls: arr_urls,
        orders: arr_temp
      };
    }
    catch(error) {
      console.log("Error occurred in reading Artworks...")
      console.log(error);
    }
    var endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

  }

  async preload(urls, orders) {
    var images = urls
    var results = [];
    let i = 0;

    for(i = 0; i < numberOfImages; i++) {      
      var img=new Image();
      img.src=images[orders[i]];
      img.id=orders[i]; // testing
      results.push(img);
    }
    
    this.setState({
      artworks_images: results
    })
    console.log("preload() finished...");
    return results; 
  }  

  handleStart = () => {
    document.getElementsByClassName("container-images")[0].style.display = "flex";
    document.getElementsByClassName("container-start")[0].style.display = "none";
    document.getElementsByClassName("container-header")[0].style.height = "10%";
    document.getElementsByClassName("container-header")[0].style.fontSize = "1em";
    document.getElementsByClassName("container-header-index")[0].style.display = "inline";

    this.setState({
      index: 0,
      // artworks_order: temp,
    })
  }

  handleSelect = (e) => {
    var temp = e.currentTarget.id;
    var temp_choice = this.state.artworks_choice;
    temp_choice.push(temp);
    if (this.state.index >= numberOfImages - 2) {
      console.log("Game is over")
      this.setState({    
        index: 0,
        artworks_choice: temp_choice
      })
      this.gameover();
      return
    } 
    
    this.setState({
      index: this.state.index + 2,
      artworks_choice: temp_choice,
    })

  }
  
  handleReplay = () => {
    // shuffle artworks again
    var temp = this.shuffle(this.state.artworks_order);

    // preload()
    this.preload(this.state.artworks_url, temp)

    this.setState({ 
      index: 0,
      artworks_choice: [],
      artworks_order: temp
    });
    
    document.getElementsByClassName("container-header")[0].style.height = "10%";
    document.getElementsByClassName("container-header")[0].style.fontSize = "1em";
    document.getElementsByClassName("container-images")[0].style.display = "flex";
    document.getElementsByClassName("container-replay")[0].style.display = "none";
    document.getElementById('submit').disabled = false;
  }

  handleSubmit = (e) => {
    console.log("Inside handleSubmit()");
    e.preventDefault();

    // Use artworks_list and artworks_choice
    const artworks = this.state.artworks_list;
    const choices = this.state.artworks_choice;
    const artworks_order = this.state.artworks_order;

    // Calculate Correct Answers, Choices Selected
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
    
    // Disable Submit Button 
    document.getElementById("submit").disabled = true;
  }

  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  gameover() {
    document.getElementsByClassName("container-images")[0].style.display = "none";
    document.getElementsByClassName("container-replay")[0].style.display = "flex";    
    document.getElementsByClassName("container-replay")[0].style.height = "90%";    
    document.getElementsByClassName("container-header")[0].style.fontSize = "1em";
  }

  render() {

    return (
      
      <div className="App">
        
    { this.state.isDataLoaded === true ? 
      <div style={{height: "100%", width: "100%"}}>

        <div className="container-header">
          <h1>Price is Art!</h1>
          <h3>Choose an Expensive-looking Artwork </h3>
        
          <div className="container-header-index"> {this.state.index / 2 + 1} / {numberOfImages/2}</div>
        </div>

        <div className="container-start">
          <button className="button-75" onClick={this.handleStart}>
            <span className="text">START</span>
          </button>
        </div>

        <div className="container-replay">
          <button onClick={this.handleReplay}>REPLAY</button>
          <button id="submit" onClick={this.handleSubmit}>SUBMIT YOUR RESPONSE</button>


          <div style={{height: "100%", display: "flex", flexDirection: "column", overflowY:"auto"}}>
            <h2 style={{margin: "1% 0"}}>Result ( {} / { numberOfImages / 2 })</h2>
              {this.state.artworks_choice.map((item, i) => {
                return(
                  <div color={"yellow"} style={{border: "solid black 10px", display: "flex", }}>
                    
                    <div className="container-results" style={{ backgroundColor: (i % 2 === 0 ? '#FFA07A' : '#7b1113') }}  >
                      <div className="container-results-header">
                        <h2> {"$" + this.state.artworks_list[this.state.artworks_order[(i * 2)]].adjusted_price + " Millions"}</h2>
                        <h3> {this.state.artworks_list[this.state.artworks_order[(i * 2)]].name}  </h3>
                      </div>

                      <div className="container-results-body">  
                        <img className="image-results" src={this.state.artworks_images[(i * 2)].src} alt="yes" />                      
                        <div className="overlay">
                          <div className="overlay-text">
                            <p className="text" style={{fontSize: "2em"}}>By {this.state.artworks_list[this.state.artworks_order[(i * 2)]].artist} in {this.state.artworks_list[this.state.artworks_order[(i * 2)]].year}</p>
                            <p className="text" style={{fontSize: "3em"}}><b>${this.state.artworks_list[this.state.artworks_order[(i * 2)]].adjusted_price} Millions</b></p>
                            <p className="text" style={{fontSize: "1em"}}>Sold at {this.state.artworks_list[this.state.artworks_order[(i * 2)]].auction_house} on {this.state.artworks_list[this.state.artworks_order[(i * 2)]].date_of_sale}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="container-results" style={{ backgroundColor: (i % 2 === 0 ? '#FFA07A' : '#7b1113'), flexDirection: "row", height: "100%", width: "10%", textAlign: "center", alignItems: "center", wordBreak: "break-word" }}>
                      <Result leftPrice={this.state.artworks_list[this.state.artworks_order[(i * 2)]].adjusted_price} rightPrice={this.state.artworks_list[this.state.artworks_order[(i * 2) + 1]].adjusted_price} choice={this.state.artworks_choice[i]} />
                    </div>

                    <div className="container-results" style={{ backgroundColor: (i % 2 === 0 ? '#FFA07A' : '#7b1113') }}  >
                      <div className="container-results-header">
                        <h2> {"$" + this.state.artworks_list[this.state.artworks_order[(i * 2) + 1]].adjusted_price + " Millions"}</h2>
                        <h3> {this.state.artworks_list[this.state.artworks_order[(i * 2) + 1]].name}  </h3>
                      </div>
                      <div className="container-results-body">  
                      <img className="image-results" src={this.state.artworks_images[(i * 2) + 1].src} alt="yes" />                      
                        <div className="overlay">
                          <div className="overlay-text">
                            <p className="text" style={{fontSize: "2em"}}>By {this.state.artworks_list[this.state.artworks_order[(i * 2) + 1]].artist} in {this.state.artworks_list[this.state.artworks_order[(i * 2) + 1]].year}</p>
                            <p className="text" style={{fontSize: "3em"}}><b>${this.state.artworks_list[this.state.artworks_order[(i * 2) + 1]].adjusted_price} Millions</b></p>
                            <p className="text" style={{fontSize: "1em"}}>Sold at {this.state.artworks_list[this.state.artworks_order[(i * 2) + 1]].auction_house} on {this.state.artworks_list[this.state.artworks_order[(i * 2) + 1]].date_of_sale}</p>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
              )})}
          </div>
        </div>


        <div className="container-images" >
          <div className="div-left" onClick={this.handleSelect} id="0">
            <h3 style={{ }}>  <i>{this.state.artworks_list[this.state.artworks_order[this.state.index]].name}</i> {this.state.artworks_list[this.state.artworks_order[this.state.index]].artist} {this.state.artworks_list[this.state.artworks_order[this.state.index]].year} </h3>
            { this.state.artworks_images.length > 0 ? 
              <img key={this.state.index} src={this.state.artworks_images[this.state.index].src} alt="left one"></img>
            :
              <div>
              </div>
            }                    
          </div>

          <div className="div-right" onClick={this.handleSelect} id="1">
            <h3 style={{}}>  <i>{this.state.artworks_list[this.state.artworks_order[this.state.index + 1]].name}</i> {this.state.artworks_list[this.state.artworks_order[this.state.index + 1]].artist} {this.state.artworks_list[this.state.artworks_order[this.state.index + 1]].year} </h3>

            { this.state.artworks_images.length > 0 ? 
              <img key={this.state.index + 1} src={this.state.artworks_images[this.state.index + 1].src} alt="right one"></img>
            :
              <div>
              </div>
            }
          </div>        
      </div>
  
      </div>
     : 
    <div style={{ display: "flex", width: "100%", height: "100%"}}>
        <h1 style={{ color: "white", textAlign: "center", flexDirection: "column", margin: " auto" }}>Loading...</h1>
    </div>
          }

    </div>
    )
         
  }
}


export default App;
