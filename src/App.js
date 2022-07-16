import React, { Component } from "react";
import './App.css';

import Header from './components/Header';
import Start from './components/Start';
import Game from './components/Game';
import Result from './components/Result';
import Ranking from './components/Ranking';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDataLoaded: false,
      appStart: false,

      index: 0, 

      preurl: (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://127.0.0.1:8000/postgres/":"https://priceisart-app.herokuapp.com/postgres/", 
      artworks: [],
      artworks_userResponse: [], // This shows selections made by users and each index will associate with arworks_list[i] and artworks_lists[i + 1[] 
      artworks_order: [], // This shows number of images to display to users 
      artworks_image: [],
        
      currentView: "Start"
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleReplay = this.handleReplay.bind(this);
    this.handleGameOver = this.handleGameOver.bind(this);
    this.handleShowRanking = this.handleShowRanking.bind(this);
  }

  // Read Artworks
  async componentDidMount() {
    console.log("componentDidMount...");

    // Get artworks data
    const result = await this.readArtworks();

    // Set artworks_order
    const newOrder = this.shuffle(result.length);

    // Initialize artworks_image
    await this.loadImages(result, newOrder, 10);

    this.setState({
      artworks_order: newOrder
    })
    console.log("     componentDidMount()...")
  }

  shuffle(n) {
    // randomly generated N = 10 length array 0 <= A[N] <= 39
    var arr = Array.from({length: 10}, () => Math.floor(Math.random() * n));
    return arr;
  }
  
  // Call API to get data from Postgres
  async readArtworks() {
    var startTime = performance.now()
    try {
      console.log("Running readArtworks()....")
      const url2 = this.state.preurl + 'api1/'
      const url = "https://priceisart-app.herokuapp.com/postgres/api1/"
      console.log("url: " + url);
      const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let res_json = await res.json();

      this.setState({
        artworks: res_json,
      })
      console.log(" readArtworks() ending....")
    
      return res_json;
    }
    catch(error) {
      console.log("Error occurred in reading Artworks...")
      console.log(error);
      var endTime = performance.now()
      console.log(`   Inside readArtworks()... ${endTime - startTime} milliseconds`)
    }
  }

  // load images to 'artwork_images'; skip if already added
  async loadImages(artworks, order, n) {
    console.log("loadImages()...");

    // Retrieve from 'artworks_image'
    var images = this.state.artworks_image;
  
    // check if the image is already filled then add if not
    let i = 0;
    for(i = 0; i < n; i++) {      
      if ( images[order[i]] === "" || images[order[i]] === undefined){
        var img=new Image();
        img.src=artworks[order[i]].full_path;
        img.id=artworks[order[i]].id; // testing
        images[order[i]] = img;
      } else
        console.log(images[order[i]].id + " is already added...")
    }
    
    this.setState({
      artworks_image: images,
      isDataLoaded: true,
    })
    return images; 
  }  

  async handleStart() {    
    if (this.state.isDataLoaded === true) {
      this.setState({
        currentView: "Game",
      })
    }      
    return 1;
  }
  
  // Need to Reset something except we load image to existing array
  handleReplay = async () => {
    // shuffle artworks again
    var new_order = this.shuffle(this.state.artworks.length);
    
    // load (more) images using the new order
    await this.loadImages(this.state.artworks, new_order, 10);

    this.setState({ 
      artworks_userResponse: [],
      artworks_order: new_order,
      currentView: "Game",
    });
    
  }

  // Receive response from User then show Result page 
  handleGameOver(response) {
    console.log("  handleGameOver() is called..... ")
    console.log(response); // Chosen order[i]
    
    this.setState({ 
      currentView: "Result",
      artworks_userResponse: response,
    });    
  }

  handleShowRanking() {
    if (this.state.currentView === "Result") {
      this.setState({ 
        currentView: "Ranking"
      });    
    } else if (this.state.currentView === "Ranking") {
      this.setState({ 
        currentView: "Result"
      });    
    }

  }

  render() {

    return (
      
      <div className="App">
        
          <Header currentView={this.state.currentView} handleShowRanking={this.handleShowRanking} />
          {this.state.currentView === "Start" && <Start handleStart = {this.handleStart} />}
          {this.state.currentView === "Game" && this.state.isDataLoaded === true && <Game artworks={this.state.artworks} order={this.state.artworks_order} images={this.state.artworks_image} handleGameOver = {this.handleGameOver} /> }
          {this.state.currentView === "Result" && <Result artworks={this.state.artworks} order={this.state.artworks_order} artworks_image={this.state.artworks_image} userResponses={this.state.artworks_userResponse} handleReplay={this.handleReplay} handleShowRanking={this.handleShowRanking} />}

      </div>
    )
         
  }
}


export default App;
