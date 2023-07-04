import React, { useState, useEffect }  from 'react';
import './Ranking.css';

/*
    Receive artworks info and images to display top 10    
*/

function Ranking(props) {

    const currentView = props.currentView;
    const preurl = props.preurl;
    const artworks_image = props.artworks_image; // For Artworks images
    const artworks_ranking = props.artworks_ranking; // To get correct 3 images from above two props
    const user = props.user;
    const order = artworks_ranking.map(a => a.id); // Make an array using 'artworks_ranking'

    const [comments, setCommments] = useState([]);
    const [addComment, setAddcomment] = useState(false);

    const [artworkComment, setArtworkComment] = useState(0);
    const [lastScoring, setLastScoring] = useState(0);

    // When ranking page is displayed, load comments for those
    useEffect(() => {
        var fetchComments = async () => {
            const url = props.preurl + '/artworks/comment'
            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                credentials: "include",
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order)
            };
            const result = await fetch(url, requestOptions);
            const data = await result.json();
            if (Object.keys(data).length !== 0) {
                setCommments(data);
            }
        }            
        fetchComments().catch(console.error);        
    }, [props.artworks_ranking]);

    function handleShowForm(e, id) {
        e.preventDefault();

        const accessToken = user.accessToken;
        if (!accessToken || accessToken === '') {
            console.log("You're not logged in!")
            return
        }
        setArtworkComment(id);
        setAddcomment(true);
    }
    function handleHideForm(e) {
        e.preventDefault();
        setAddcomment(false);
    }

    async function submitComment(e) {
        // add a comment
        // parent_id, artwork_id, comment, score, user_id, username
        e.preventDefault();
        const comment = e.target.comment.value;
        const artwork_id = artworkComment; 
        const inputData = { parent_id: null, artwork_id: artwork_id, comment: comment, score: 1, user_id: user.id, username: user.username};
        const url = preurl + '/artworks/comment';

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            },
            body: JSON.stringify(inputData)
        };

        await fetch(url, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    // once a comment is successfully added. 
                    // added it to my clinet too 
                    setAddcomment(false);
                    setCommments(prevComments => [...prevComments, inputData]);
                }
                return response.json();
            })
            .catch(error => {
                throw new Error(error);  // ***
            });  
        
    }

    return (
        <div>
            {currentView === 'Ranking' ? 
            <div className="container-ranking">
                <div className="container-ranking-body">
                    <div className='content-ranking'>
                        <div className='content-ranking-header'>
                            <h2>3 Most Clicked Artworks</h2>
                        </div>

                        {artworks_ranking.map((artwork, i) => {
                            return (  
                                <div key={i} className='content-ranking-wrapper'>
                                <div className='content-ranking-left'>
                                {/*    <img key={`frame-${i}`} id="img-frame" src={require('../static/frames/frame1.png')} alt="frame"  /> */}
                                    <img key={artwork.name} src={artworks_image[artwork.id].src} alt="right one"></img>
                                </div>

                                <div  className='content-ranking-right'>
                                    <div className='content-ranking-info'>
                                        <h3 id="name"> {artwork.id}|{i}  {artwork.name}</h3>
                                        <p id="artistyear">{artwork.artist} in {artwork.year}</p>
                                        <p id="dateofsale">Sold on {artwork.date_of_sale}</p>
                                        <p id="price">${parseFloat(artwork.adjusted_price)} Millions</p>
                                        <p id="counts"># Clicked: <span>{artwork.count}</span></p> 
                                    </div>

                                    <div className='content-ranking-comment'>
                                        <div className='comment-top-container'>
                                            <div style={{height:"100%", overflowY: "scroll", backgroundColor: "red",}}>
                                                { comments ? comments.filter(comment => comment.artwork_id === artwork.id).map((comment, j) => (
                                                    <div key={j} >
                                                        <p key={j}>{comment.id} {comment.username}: {comment.comment} {comment.score}</p>
                                                    </div>
                                                ))  : null }
                                            </div>
                                        </div>

                                        <div className='comment-bottom-container'>
                                            <button onClick={e => handleShowForm(e, artwork.id)}>Add a comment</button>
                                        </div>
                                    </div>
                                </div>
                                
                                { addComment && artworkComment === artwork.id ?
                                    <div className='div-add-comment'>
                                        <form className='div-add-comment' onSubmit={submitComment}>
                                            <p>{artwork.name}</p>
                                            <label>
                                                <input type="text" name="comment" />
                                            </label>
                                            <button onClick={handleHideForm}>X</button>
                                            
                                            <br/><br/><input type="submit" value="Reply"/>        
                                        </form>
                                    </div>
                                : null
                                }
                            </div>
                        )}   
                    )}
                    </div>
                </div>
            </div>
   
        : null 
        }
        </div>
    )
}

export default Ranking;

/* 

    // parent_id, artwork_id, comment, score, user_id, username
    async function handleScoring(e) {
        const comment_id = e.target.id; 
        const user_selected = e.target.value;
        const user_vote = e.target.name;
        var inputData = { id: comment_id, score: user_selected};
        var url;
        var requestOptions;

        // upvote is selected
        // downvote is selected
        // undo (same one checked last time )

        const userSelected =2;
        if (userSelected === lastScoring) {
            inputData.user_scoring = userSelected * -1;
            inputData.score = 0;
        } else if (user_vote === 'upvote') {
            inputData.score = 1
        } else if (user_vote === 'downvote') {
            inputData.score = -1
        }

        url = preurl + '/artworks/comment'
        requestOptions = {
            method: 'PATCH',
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(inputData)
        };    
        await fetch(url, requestOptions);

        // 
    }


*/