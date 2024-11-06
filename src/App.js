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
      preurl: (window.location.hostname === "localhost") ? "http://localhost:3000":"https://priceisart-express.azurewebsites.net", 
      artworks: [],
      artworks_order: [], 
      artworks_image: [],
      artworks_userResponse: [], 
      artworks_ranking: [],
      currentView: "Start",
      user: {},
    };

    // this.handleStart = this.handleStart.bind(this);
    // this.handleReplay = this.handleReplay.bind(this);
    // this.handleGameOver = this.handleGameOver.bind(this);
    // this.handleShowRanking = this.handleShowRanking.bind(this);
    // this.handleLogin = this.handleLogin.bind(this);
    // this.handleLogout = this.handleLogout.bind(this);
  }

  // shuffle(n) {
  //   console.log(n);
  //   var arr = Array.from({length: 10}, () => Math.floor(Math.random() * n));
  //   return arr;
  // }

  // async componentDidMount() {
    // // Authenicate the accessToken
    
    // console.log('componentDidUpdate....');
    // const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    // console.log(user)

    // const url = this.state.preurl + '/users/authToken';        
    // const requestOptions = {
    //     method: 'GET',
    //     credentials: "include",
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${user.accessToken}`
    //     },
    // };

    // await fetch(url, requestOptions).then(response => {
    //   if (response.status === 400 || response.status === 401) {
    //     console.log('accessToken/refreshToken is not valid...')
    //     this.handleLogout({});
    //   } else if (response.status === 200) {
    //     console.log('accessToken is ok')
    //     return response.json()
    //   }
    // }).then(result => {
    //   if (result) {
    //     console.log('logging in');
    //     user.accessToken = result.accessToken;
    //     this.handleLogin(user);
    //   }
    // })

  // }

  // // Call API to get Artworks data from Postgres
  // async readArtworks() {
  //   try {
  //     const url = this.state.preurl + '/artworks/'
  //     const res = await fetch(url, {
  //       method: 'GET',
  //       mode: 'cors',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     let res_json = await res.json();
  //     return res_json;
  //   }
  //   catch(error) {
  //     console.log("Error occurred in reading Artworks...")
  //   }
  // }

  // // Call API to get Top-10 data from Postgres
  // async readTopRanking() {
  //   try {
  //     const url_ranking = this.state.preurl + "/artworks/ranking/"  
  //     const res_ranking = await fetch(url_ranking, {
  //       method: 'GET',
  //       mode: 'cors',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     let res_json_ranking = await res_ranking.json();
  //     return res_json_ranking;
  //   }
  //   catch(error) {
  //     console.log("Error occurred in reading readTopRanking()...")
  //   }
  // }

  // // load images to 'artwork_images'; skip if already added
  // async loadImages(artworks, order, n) {
  //   var images = this.state.artworks_image;
  //   let i = 0;
  //   for(i = 0; i < n; i++) {      
  //     if (artworks[order[i]] !== undefined && (images[order[i]] === "" || images[order[i]] === undefined)){
  //       var img=new Image();
        
  //       const full_path = this.state.preurl + '/resources/artworks/' + artworks[order[i]].file_path;
  //       img.src=full_path;
  //       img.id=artworks[order[i]].id; 
  //       images[order[i]] = img;
  //     } 
  //   }    

  //   return images; 
  // }  

  // // Get 10 random images for Game. Also, get top 10 images for Ranking 
  // async handleStart() {    
  //   var result = await this.readArtworks();
  //   if (result === undefined) {
  //     alert("The app is not currently available... There must be some issue in the backend")
  //   }
  //   const newOrder = this.shuffle(result.length - 1); // 0 to n - 1  
  //   const images = await this.loadImages(result, newOrder, 10);

  //   console.log(`handleStart...`)
  //   console.log(`newOrder: ${newOrder}`)
  //   console.log(images);
    
  //   this.setState({
  //     artworks: result,
  //     artworks_order: newOrder,      
  //     currentView: "Game",
  //     artworks_image: images,
  //     isDataLoaded: true, 
  //   })
  // }
  
  // // load (more) images using the new order
  // async handleReplay() {
  //   var new_order = this.shuffle(this.state.artworks.length);
  //   await this.loadImages(this.state.artworks, new_order, 10);
  //   this.setState({ 
  //     artworks_userResponse: [],
  //     artworks_order: new_order,
  //     currentView: "Game",
  //   });    
  // }

  // // Switch to Result for first time or back from Ranking
  // handleGameOver(response) {
  //   if (response) {
  //     this.setState({ 
  //       currentView: "Result",
  //       artworks_userResponse: response,
  //     });           
  //   } else {
  //     this.setState({ 
  //       currentView: "Result",
  //     });   
  //   }    
  // }

  // handleLogin(user) {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.setState({ user: user });
  // }

  // async handleLogout() {
  //   localStorage.clear('user');
  //   this.setState({ user: {} });
  // }

  // // Retrieve data for Top Ranking artworks again and load it (if needed)
  // async handleShowRanking() {
  //     console.log('handleShowRanking called...')

  //     const artworks_ranking = await this.readTopRanking();

  //     // '-1' is needed because 'artwork' variable starts at 0 whereas databsae start at 0 
  //     const topOrder = artworks_ranking.map(a => a.artwork_id - 1); // index
 
  //     const images = await this.loadImages(this.state.artworks, topOrder, 3); // fetch 5 images

  //     console.log('Final output for Ranking... ')
      
  //     this.setState({ 
  //       artworks_ranking: artworks_ranking,
  //       artworks_image: images,
  //       currentView: "Ranking",
  //     });    
  // }

  render() {
    return (
      <div className="App">
        {
          /*
          <Header user={this.state.user} preurl={this.state.preurl} currentView={this.state.currentView} handleLogin={this.handleLogin} handleLogout={this.handleLogout} handleShowRanking={this.handleShowRanking} handleGameOver={this.handleGameOver} />
          { this.state.currentView === "Start" && <Start handleStart = {this.handleStart} /> }
          { this.state.currentView === "Game" && <Game artworks={this.state.artworks} order={this.state.artworks_order} images={this.state.artworks_image} handleGameOver={this.handleGameOver} /> }          
          { (this.state.currentView === "Result" || this.state.currentView === "Ranking") && 
            <>
            <Result currentView={this.state.currentView} user={this.state.user} preurl={this.state.preurl} artworks={this.state.artworks} order={this.state.artworks_order} artworks_image={this.state.artworks_image} userResponses={this.state.artworks_userResponse} handleReplay={this.handleReplay} />
            <Ranking currentView={this.state.currentView} user={this.state.user} preurl={this.state.preurl} artworks={this.state.artworks} artworks_ranking={this.state.artworks_ranking} artworks_image={this.state.artworks_image} handleLogout={this.handleLogout}/>
            </>
          }
          */
        }

        <p>
          HELLO WORLD!
        </p>

      </div>
    )
  }
}

export default App;
