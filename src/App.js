import React, { Component } from "react";
import './App.css';

import Start from './components/Start';
import Game from './components/Game';
import Result from './components/Result';

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
      const url = this.state.preurl + 'api1/'
      console.log("url: " + url);
      const res = await fetch(url);
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
      if ( images[order[i]] == "" || images[order[i]] == undefined){
        var img=new Image();
        img.src=artworks[order[i]].full_path;
        img.id=artworks[order[i]].id; // testing
        images[order[i]] = img;
      } else
        console.log(images[order[i]].id + " is already added...")
    }
    
    this.setState({
      artworks_image: images
    })
    return images; 
  }  

  async handleStart() {    
    this.setState({
      isDataLoaded: true,
      currentView: "Game",
    })
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

  handleGameOver(response) {
    console.log("  handleGameOver() is called..... ")
    console.log(response);
    
    this.setState({ 
      currentView: "Result",
      artworks_userResponse: response,
    });    
  }

  render() {

    return (
      
      <div className="App">
        
        <div style={{height: "100%", width: "100%"}}>
          {this.state.currentView === "Start" && <Start handleStart = {this.handleStart} />}
          {this.state.currentView === "Game" && <Game artworks={this.state.artworks} order={this.state.artworks_order} images={this.state.artworks_image} handleGameOver = {this.handleGameOver} /> }
          {this.state.currentView === "Result" && <Result artworks={this.state.artworks} order={this.state.artworks_order} artworks_image={this.state.artworks_image} artworks_userResponse={this.state.artworks_userResponse} handleReplay={this.handleReplay}  />}
        </div>

      </div>
    )
         
  }
}


export default App;
