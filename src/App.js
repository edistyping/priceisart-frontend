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
      preurl: (window.location.hostname === "localhost") ? "http://localhost:3000":"https://priceisart-express.azurewebsites.net", 
      artworks: [],
      artworks_order: [], 
      artworks_image: [],
      artworks_userResponse: [], 
      artworks_ranking: [],
      currentView: "Start",

      user: {},
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleReplay = this.handleReplay.bind(this);
    this.handleGameOver = this.handleGameOver.bind(this);
    this.handleShowRanking = this.handleShowRanking.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  shuffle(n) {
    // randomly generated N = 10 length array 0 <= A[N] <= 39
    var arr = Array.from({length: 10}, () => Math.floor(Math.random() * n));
    return arr;
  }
  
  // Call API to get Artworks data from Postgres
  async readArtworks() {
    try {
      var startTime = performance.now()
      const url = this.state.preurl + '/artworks/'
      const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let res_json = await res.json();
      var endTime = performance.now()
      //console.log(`   Inside readArtworks()... ${endTime - startTime} milliseconds`)
      return res_json;
    }
    catch(error) {
      console.log("Error occurred in reading Artworks...")
      console.log(error);
    }
  }

  // Call API to get Top-10 data from Postgres
  async readTopRanking() {
    var startTime = performance.now()
    try {

      const url_ranking = this.state.preurl + "/artworks/ranking/"  
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
    var images = this.state.artworks_image;
    let i = 0;
    for(i = 0; i < n; i++) {      
      if (artworks[order[i]] !== undefined && (images[order[i]] === "" || images[order[i]] === undefined)){
        var img=new Image();
        const full_path = this.state.preurl + '/resources/artworks/' + artworks[order[i]].file_path;
        img.src=full_path;
        img.id=artworks[order[i]].id; 
        images[order[i]] = img;
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
  
    // Get artworks data and load 10 random images using 'newOrder'
    var result = await this.readArtworks();
    if (result === undefined) {
      alert("The app is not currently available... There must be some issue in the backend")
    }

    const newOrder = this.shuffle(result.length);
    const images = await this.loadImages(result, newOrder, 10);

    this.setState({
      artworks: result,
      artworks_order: newOrder,      
      currentView: "Game",
      artworks_image: images,
      isDataLoaded: true, 
    })
  }
  
  // Need to Reset something except we load image to existing array
  // shuffle artworks again
  // load (more) images using the new order
  async handleReplay() {
    var new_order = this.shuffle(this.state.artworks.length);
    await this.loadImages(this.state.artworks, new_order, 10);

    this.setState({ 
      artworks_userResponse: [],
      artworks_order: new_order,
      currentView: "Game",
    });    
  }

  // Switch to Result for first time or back from Ranking
  handleGameOver(response) {

    if (response) {
      this.setState({ 
        currentView: "Result",
        artworks_userResponse: response,
      });           
    } else {
      this.setState({ 
        currentView: "Result",
      });   
    }    
  }

  handleLogin(user) {
    this.setState({ user: user });
  }

  handleLogout() {
    this.setState({ user: {}})
  }

  // Switch between Result page and Ranking page
  // Retrieve data for Top Ranking artworks again and load it (if needed)
  async handleShowRanking() {
      const artworks_ranking = await this.readTopRanking();
      const topOrder = artworks_ranking.map(a => a.artwork_id);
      await this.loadImages(this.state.artworks, topOrder, 5);
      var temp = [];
      for (let i = 0; i < topOrder.length; i++) {
        // Get artwork details for topOrder
        var obj = this.state.artworks.find(item => {
          return item.id === topOrder[i]          
        })
        obj.count = artworks_ranking[i].count;
        obj.win = artworks_ranking[i].win;
        temp.push(obj);
      }
      
      this.setState({ 
        artworks_ranking: temp,
        currentView: "Ranking",
      });    
  }

  render() {
    return (
      <div className="App">
          <Header user={this.state.user} preurl={this.state.preurl} currentView={this.state.currentView} handleLogin={this.handleLogin} handleLogout={this.handleLogout} handleShowRanking={this.handleShowRanking} handleGameOver={this.handleGameOver} />

          { this.state.currentView === "Start" && <Start handleStart = {this.handleStart} /> }
          { this.state.currentView === "Game" && <Game artworks={this.state.artworks} order={this.state.artworks_order} images={this.state.artworks_image} handleGameOver={this.handleGameOver} /> }
          { (this.state.currentView === "Result" || this.state.currentView === "Ranking") && 
          <>
            <Result currentView={this.state.currentView} user={this.state.user} preurl={this.state.preurl} artworks={this.state.artworks} order={this.state.artworks_order} artworks_image={this.state.artworks_image} userResponses={this.state.artworks_userResponse} handleReplay={this.handleReplay} />
            <Ranking currentView={this.state.currentView} user={this.state.user} preurl={this.state.preurl} artworks_image={this.state.artworks_image} artworks_ranking={this.state.artworks_ranking}/>
          </>
          }
        </div>
    )
  }
}

//{this.state.currentView === "Game" && this.state.isDataLoaded === true}
export default App;
