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

    console.log(window.location.hostname);
    this.state = {
      isDataLoaded: false,
      isDataSubmitted: false,
      appStart: false,

      preurl: (window.location.hostname === "localhost") ? "http://localhost:3000":"https://price-is-art-backend-node.onrender.com", 
      
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

    // Below are moved to 'handleStart() button

    // Get artworks data
    //const result = await this.readArtworks();

    // Set artworks_order
    //const newOrder = this.shuffle(result.length);

    this.setState({
      //artworks_order: newOrder
    })
  }

  shuffle(n) {
    // randomly generated N = 10 length array 0 <= A[N] <= 39
    var arr = Array.from({length: 10}, () => Math.floor(Math.random() * n));
    return arr;
  }
  
  // Call API to get Artworks data from Postgres
  async readArtworks() {
    var startTime = performance.now()
    try {
      const url = this.state.preurl + '/artworks/'
      
      console.log(`Running readArtworks().... ${url}`)

      const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let res_json = await res.json();
      console.log("Ending readArtworks()....")
      return res_json;
    }
    catch(error) {
      console.log("Error occurred in reading Artworks...")
      console.log(error);
      var endTime = performance.now()
      console.log(`   Inside readArtworks()... ${endTime - startTime} milliseconds`)
    }
  }

  // Call API to get Top-10 data from Postgres
  async readTopRanking() {
    var startTime = performance.now()
    try {
      console.log("Running readTopRanking()....")

      const url_ranking = this.state.preurl + "/ranking/"  
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


  // load images to 'artwork_images'; skip if already added
  async loadImages(artworks, order, n) {
    console.log("loadImages()...");

    // Retrieve from 'artworks_image'
    var images = this.state.artworks_image;

    // check if the image is already filled then add if not
    let i = 0;
    for(i = 0; i < n; i++) {      
      if (artworks[order[i]] !== undefined && (images[order[i]] === "" || images[order[i]] === undefined)){
        var img=new Image();
        
        // var full_path = 'http://localhost:3000/artworks/' + artworks[order[i]].file_path;
        // https://price-is-art-backend-node.onrender.com/artworks/Alberto%20Giacometti---Chariot.jpg
        const full_path = this.state.preurl + '/artworks/' + artworks[order[i]].file_path;

        img.src=full_path;
        img.id=artworks[order[i]].id; 
        images[order[i]] = img;
      } else {
        images[order[i]] = '';
      }
    }
    
    this.setState({
      // artworks_image: images,
      // isDataLoaded: true,
    })
    return images; 
  }  

  // Get 10 random images for Game. Also, get top 10 images for Ranking 
  async handleStart() {    
    console.log("handleStart() clicked")
    
    // Get artworks data and load 10 random images using 'newOrder'
    var result = await this.readArtworks();
    const newOrder = this.shuffle(result.length);
    console.log(newOrder)
    console.log('-------------------------------------------')
    const images = await this.loadImages(result, newOrder, 10);
    
    console.log(result.length)

    this.setState({
      
      artworks: result,
      artworks_order: newOrder,      
      currentView: "Game",
      artworks_image: images,
      isDataLoaded: true, 
    })

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
    });
    
  }

  // Receive response from User then show Result page 
  handleGameOver(response) {

    if(response === undefined){
      this.setState({
        currentView: "Result",
      });
    } else {
      this.setState({ 
        currentView: "Result",
        artworks_userResponse: response,
      });   
    } 
  }

  // Switch between Result page and Ranking page
  async handleShowRanking() {
      // Retrieve data for Top Ranking artworks again and load it (if needed)
      console.log("handleShowRanking..")

      const artworks_top = await this.readTopRanking();
      let topOrder = artworks_top.map(a => a.artwork_id);
      await this.loadImages(this.state.artworks, topOrder, 5);

      var temp = [];
      for (let i = 0; i < topOrder.length; i++) {
        // Get artwork details for topOrder
        var obj = this.state.artworks.find(item => {
          return item.id === topOrder[i]          
        })
        temp.push(obj);
      }

      this.setState({ 
        currentView: "Ranking",
        artworks_top: temp
      });    
  }  
  
  // ? I think I can move this inside Result.js
  handleSubmit() {
    this.setState({
      isDataSubmitted: true, 
    })
  }


  render() {
    return (
      <div className="App">
          <Header currentView={this.state.currentView} isDataLoaded={this.state.isDataLoaded} handleShowRanking={this.handleShowRanking} handleGameOver={this.handleGameOver} />
          {this.state.currentView === "Start" && <Start handleStart = {this.handleStart} />}
          {this.state.currentView === "Game" && this.state.isDataLoaded === true && <Game artworks={this.state.artworks} order={this.state.artworks_order} images={this.state.artworks_image} handleGameOver = {this.handleGameOver} /> }
          {this.state.currentView === "Result" && <Result isDataSubmitted={this.state.isDataSubmitted} artworks={this.state.artworks} order={this.state.artworks_order} artworks_image={this.state.artworks_image} userResponses={this.state.artworks_userResponse} handleReplay={this.handleReplay} handleSubmit={this.handleSubmit} />}
          {this.state.currentView === "Ranking" && <Ranking artworks_image={this.state.artworks_image} artworks_top={this.state.artworks_top}/>}
      </div>
    )
  }
}


export default App;
