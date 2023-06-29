import React, { useState, useEffect }  from 'react';
import './Ranking.css';

/*
    Receive artworks info and images to display top 10    
*/

function Ranking(props) {
    
    console.log('This is Ranking...');
    const preurl = props.preurl;
    const artworks_ranking = props.artworks_ranking; // To get correct 3 images from above two props
    const order = artworks_ranking.map(a => a.id); // Make an array using 'artworks_ranking'
    const artworks_image = props.artworks_image; // For Artworks images
    const [comments, setCommments] = useState([]);
    const [showComments, setShowcomments] = useState(false);
    const [addComment, setAddcomment] = useState(false);

    console.log(artworks_ranking);
    console.log(order);
    
    // When ranking page is displayed, load comments for those
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // get comments
        var fetchComments = async () => {
            // get only artworks_ranking ids
            const url = props.preurl + '/artworks/comments'
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
            console.log('inside fetchComments()....')
            console.log(data);
            setCommments(data);
        }

        fetchComments().catch(console.error);
    }, []);

    function handleShowAllComments(e) {  
        console.log('Show all comments clicked')
        setShowcomments(true);
    }

    function handleAddComment(e) {
        console.log('handleShowAllComments() called...')
        setAddcomment(prevCheck => !prevCheck);
    }
    async function submitComment(e, value) {
        // add a comment
        // parent_id, artwork_id, comment, score, user_id
            // skip parent_id for now
            // how do i pass artwork_id? 
        // comments are divided by artworks then by sorted by score
        e.preventDefault();
        const comment = e.target.comment.value;
        console.log('submitComment() is called....')
        console.log(comment);
        console.log(value);
        const inputData = { parent_id: null, artwork_id: value, comment: comment, score: 1, user_Id: 0};
        // console.log(artwork_id);
        
        const url = preurl + '/artworks/comment';
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData)
        };

        await fetch(url, requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status === 200) {
                    // once a comment is successfully added. 
                    // added it to my clinet too 
                    setAddcomment(false);
                    setCommments(prevComments => [...prevComments, inputData])

                }
                return response.json()
            }).then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log("Error when submitting the response!");
                throw new Error("HTTP error " + error);  // ***
        });  
        console.log('----------------------------');
        
    }

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
                             {/*    <img key={`frame-${i}`} id="img-frame" src={require('../static/frames/frame1.png')} alt="frame"  /> */}
                                <img src={artworks_image[item].src} alt="right one"></img>
                            </div>

                            <div  className='content-ranking-right'>
                                <h3 id="name"> {item}|{i}  {artworks_ranking[i].name}</h3>
                                <p id="artistyear">{artworks_ranking[i].artist} in {artworks_ranking[i].year}</p>
                                <p id="dateofsale">Sold on {artworks_ranking[i].date_of_sale}</p>
                                <p id="price">${parseFloat(artworks_ranking[i].adjusted_price)} Millions</p>
                                <p id="counts"># Clicked: <span>{artworks_ranking[i].count}</span></p> 

                                <div key={item} className='content-ranking-comment'>
                                    <button className='button-comments' onClick={handleShowAllComments}>See all Comments</button>
                                    { comments.filter(comment => comment.artwork_id === artworks_ranking[i].id).map(comment => (
                                        <p>{comment.user_id} ({comment.score}): {comment.comment}  (+)   (-)</p>
                                    ))  }
                                    {item}
                                    <button className='button-comments' onClick={handleAddComment}>Leave a comment</button>
                                </div>
                            </div>

                            { addComment ? 
                                <div key={item} className='div-add-comment'>
                                    <form className='div-add-comment' onSubmit={e => submitComment(e, item)}>
                                        <button onClick={handleAddComment}>X</button>
                                        <label>
                                            <input type="text" name="comment" />
                                        </label>
                                        <p>{`a_raking[i].id: ${artworks_ranking[i].id}  item: ${item}  i: ${i}`} </p>
                                        <input type="submit" value="Reply"/>        
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
    );
}

export default Ranking;