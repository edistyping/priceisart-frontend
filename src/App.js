import React, { Component } from "react";
import './App.css';

import Header from './components/Header';
import Start from './components/Start';
import Game from './components/Game';
import Result from './components/Result';
import Ranking from './components/Ranking';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

class App extends Component {

  
  constructor(props) {
    super(props);
    


    this.state = {
      isDataLoaded: false,
      isDataSubmitted: false,
      appStart: false,

      
      preurl: window.location.hostname === "localhost" ? 'http://localhost:3000' : 'damn', 
      
      artworks_index: 0, 
      artworks: [],
      artworks_userResponse: [], // This shows selections made by users for each pair of images 
      artworks_order: [], // This shows number of images to display to users 
      artworks_image: [],
      artworks_top: [],
        
      currentView: "Start"
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleReplay = this.handleReplay.bind(this);
    this.handleGameOver = this.handleGameOver.bind(this);
    this.handleShowRanking = this.handleShowRanking.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    console.log("componentDidMount...");

    // Get artworks data
    //const artworks = await this.loadArtworks();

    // Set artworks_order
    //const newOrder = this.shuffle(artworks.length);

    this.setState({
      // artworks_order: newOrder,
      // artworks: artworks,
      // isDataLoaded: true
    })
  }
  componentDidUpdate() { 
    console.log('componentDidUpdate()...')
    console.log(`     image: ${this.state.artworks_image.length}`)
    console.log(this.state.artworks_image)
  }


  shuffle(n) {
    // randomly generated N = 10 length array 0 <= A[N] <= 39
    var arr = Array.from({length: 10}, () => Math.floor(Math.random() * n));
    return arr;
  }
  
  // Call API to get Artworks data from Postgres
  async loadArtworks() {
    var startTime = performance.now()
    try {
      const url = this.state.preurl + '/artworks/'
      
      console.log(`Running loadArtworks().... ${url}`)

      const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let res_json = await res.json();
      return res_json;
    }
    catch(error) {
      console.log("Error occurred in reading Artworks...")
      console.log(error);
      var endTime = performance.now()
      console.log(`   Inside loadArtworks()... ${endTime - startTime} milliseconds`)
    }
  }

  // load images to 'artwork_images'; skip if already added
  async loadImages(artworks, order) {
    console.log(`loadImages()...      ${this.state.artworks_image.length}`);

    const numberOfImagesToRetrieve = this.state.artworks_index === 0 ? 4 : 2;
    
    // check if the image is already filled then add if not
    var images = this.state.artworks_image;
    let artworks_index = this.state.artworks_index;
    console.log(artworks); 
    console.log(order)
    for(let i = artworks_index; i < artworks_index + numberOfImagesToRetrieve; i++) {      
      if ( images[order[i]] === "" || images[order[i]] === undefined){
        var img=new Image();
        console.log(`${i}  ${order[i]}`)
        img.src=artworks[order[i]].file_path;
        img.id=artworks[order[i]].id; // testing
        images[order[i]] = img;
      } else {
        //console.log(images[order[i]].id + " is already added...")
      }
    }
    
    this.setState({
      artworks_image: images,
      artworks_index: this.state.artworks_index + 2, 
      isDataLoaded: true,
    })

    return images; 
  }  

  async handleStart() {    
    console.log("handleStart() clicked")
    
    // Get artworks data and load 10 random images using 'newOrder'
    var artworks = await this.loadArtworks();
    const newOrder = this.shuffle(artworks.length);
       
    console.log(newOrder);
    await this.loadImages(artworks, newOrder); // artworks, random order, index 
    // console.log(result.length)

    this.setState({
      artworks: artworks,
      artworks_order: newOrder,      
      // artworks_top: topOrder, // This is for ranking
      currentView: "Game",
    });
    
    return 1;
  }
  
  // Need to Reset something except we load image to existing array
  handleReplay = async () => {
    // shuffle artworks again
    var new_order = this.shuffle(this.state.artworks.length);
    
    // load (more) images using the new order
    await this.loadImages(this.state.artworks, new_order, 10);

    this.setState({ 
      isDataSubmitted: false, 
      artworks_userResponse: [],
      artworks_order: new_order,
      currentView: "Game",
      artworks_index: 0,
    });
    
  }

  // Receive response from User then show Result page 
  handleGameOver(response) {
    console.log("  handleGameOver() is called..... ")    
    this.setState({ 
      currentView: "Result",
      artworks_userResponse: response,
      artworks_index: 0,
    });    
  }

  // Call API to get Top-10 data from Postgres
  async readTopRanking() {
    var startTime = performance.now()
    try {
      console.log("Running readTopRanking()....")

      const url_ranking = this.state.preurl + "ranking/"  
      const res_ranking = await fetch(url_ranking, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let res_json_ranking = await res_ranking.json();
      return res_json_ranking;
    }
    catch(error) {
      console.log("Error occurred in reading readTopRanking()...")
      console.log(error);
      var endTime = performance.now()
      console.log(`   Inside readTopRanking()... ${endTime - startTime} milliseconds`)
    }
  }
  

  // Switch between Result page and Ranking page
  async handleShowRanking() {
    if (this.state.currentView === "Result") {
      // Retrieve data for Top Ranking artworks again and load it (if needed)
      const artworks_top = await this.readTopRanking();
      let topOrder = artworks_top.map(a => a.artworks);
      await this.loadImages(this.state.artworks, topOrder, 10);
      
      this.setState({ 
        currentView: "Ranking",
        artworks_top: artworks_top
      });    
    } else if (this.state.currentView === "Ranking") {
      this.setState({ 
        currentView: "Result",
      });    
    }
  }
  
  handleSubmit() {
    this.setState({
      isDataSubmitted: true,
    })
  }


  render() {
    return (
      <Router>

        <div className="App">
            
            {/*
            <Header currentView={this.state.currentView} isDataLoaded={this.state.isDataLoaded} handleShowRanking={this.handleShowRanking} />
            {this.state.currentView === "Start" && <Start handleStart = {this.handleStart} />}
            {this.state.currentView === "Game" && this.state.isDataLoaded === true && <Game artworks={this.state.artworks} order={this.state.artworks_order} images={this.state.artworks_image} handleGameOver = {this.handleGameOver} /> }
            {this.state.currentView === "Result" && <Result isDataSubmitted={this.state.isDataSubmitted} artworks={this.state.artworks} order={this.state.artworks_order} artworks_image={this.state.artworks_image} userResponses={this.state.artworks_userResponse} handleReplay={this.handleReplay} handleShowRanking={this.handleShowRanking} handleSubmit={this.handleSubmit} />}
            {this.state.currentView === "Ranking" && <Ranking loadImages={this.loadImages} artworks={this.state.artworks} artworks_image={this.state.artworks_image} artworks_top={this.state.artworks_top}/>}
            */}
          <Routes>
            <Route path="/" element={<Start isDataLoaded={this.state.isDataLoaded} loadGame={this.handleStart}/>}  />
            <Route path="/game"  element={<Game/>} currentView={this.state.currentView} artworks={this.state.artworks} artworks_image={this.state.artworks_image} artworks_order={this.state.artworks_order} artworks_index={this.state.artworks_index} loadImages={this.loadImages} />
            <Route path="/result"  element={<Result/>} />
            <Route path="/ranking"  element={<Ranking/>} />
          </Routes>

        </div>
        
      </Router>

    )
  }
}


export default App;
