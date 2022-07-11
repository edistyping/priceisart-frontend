import React from 'react';
import './Start.css';


const Start = props => {

    return (
        <div className="container-begin"> 
            <div className="container-begin-header">
            <h1>Price is Art!</h1>       
            </div>

            <div className="container-begin-start">
                <button className="button-75" onClick={props.handleStart} >
                    <div className="startButtonInitial" >
                        <p>START</p>
                    </div>

                    <div className="startButtonLoading">
                        <div className="startButtonLoading-top">
                            <p id="text-gamerule">Prepare to Choose Appealing Artworks!</p>
                        </div>
                        <div className="startButtonLoading-bottom">
                            <img src={require('../bobross.gif')} id="img-bobross"  />
                            <p id="text-loading">Loading...</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Start;