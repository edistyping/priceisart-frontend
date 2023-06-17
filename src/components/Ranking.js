import React  from 'react';
import './Ranking.css';

/*
    Receive artworks info and images to display top 10    
*/

function Ranking(props) {
    
    const artworks_ranking = props.artworks_ranking; // To get correct 10 images from above two props
    const order = artworks_ranking.map(a => a.id); // Make an array using 'artworks_ranking'
    const artworks_image = props.artworks_image; // For Artworks images
    console.log('This is Ranking...');
    console.log(artworks_ranking);
    return (
        <div className="container-ranking">

            <div className="container-ranking-body">
                
                <div className='content-ranking'>
                    <div className='content-ranking-header'>
                        <h2>3 Most Clicked Artworks</h2>
                    </div>
                    {order.map((item, i) => {
                        return (  
                        <div key={i} className='content-ranking-wrapper'>
                            <div className='content-ranking-left'>

                                <img key={`frame-${i}`} id="img-frame" src={require('../static/frames/frame1.png')} alt="frame"  />
                                <img key={i} src={artworks_image[item].src} alt="right one"></img>

                            </div>
                            <div className='content-ranking-right'>
                                <h3 id="name">{artworks_ranking[i].name}</h3> 
                                <p id="artistyear">{artworks_ranking[i].artist} in {artworks_ranking[i].year}</p>
                                <p id="dateofsale">Sold on {artworks_ranking[i].date_of_sale}</p>
                                <p id="price">${parseFloat(artworks_ranking[i].adjusted_price)} Millions</p>
                                <p id="counts"># Clicked: <span>{artworks_ranking[i].count}</span></p> 
                            </div>
                        </div>
                    )}   
                   )}
                    
                </div>
            </div>

        </div>
    );
}

export default Ranking;