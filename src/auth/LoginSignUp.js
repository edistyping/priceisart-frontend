import React, { useState } from 'react';
import './LoginSignUp.css';

const signupStyle = {
    background: "yellow",
    display: 'flex',
    flexDirection: 'column',
    height: '60%',
};
const loginStyle = {
    background: "green",
    display: 'flex',
    flexDirection: 'column',
    height: '40%',
};
const loginButton = {
    position: "absolute",
    top: 0,
    right: 0,
    margin: '1% 1% 0 0',
    background: '#800000',
    border: 'none',
    borderRadius: '30px',
    color: 'white',
    fontSize: "1.5rem",
    padding: '15px',
}

const LoginSignUp = props => {
    
    console.log(`LoginSignUp.....`);
    console.log(props.user);

    const preurl = props.preurl;
    const user = props.user;


    const [newUsername, setNewusername] = useState("");
    const [newPassword, setNewpassword] = useState("");
    const [newEmail, setNewemail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [warnings, setWarnings] = useState(Array(5).fill(''));

    // Hide Login/Sign up form
    // Show Login/Sign up form
    // Show logged in (show Sign Out button)
    const [showForm, setShowform] = useState(false);
    const [isSigned, setisSigned] = useState(false);

    async function handleCreate(e) {
        e.preventDefault();
        var temp = warnings;

        if (!newUsername || newUsername === '') {
            temp[0] = "Please enter username";
        }
        if (!newPassword || newPassword === '') {
            temp[1] = "Please enter password";
        }
        if (!newEmail || newEmail === '') {
            temp[2] = "Please enter email";
        }
        setWarnings(prevWarnings => [...prevWarnings, ...temp])
        
        if (newUsername && newEmail && newPassword) {
            const inputData = { username: newUsername, password: newPassword, email: newEmail};
            const url = preurl + '/users/signup';
            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                credentials: "include",
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData)
            };

            const result = await fetch(url, requestOptions)
                .then(response => {
                    if (response.status === 201) { 
                        setisSigned(true);
                        setShowform(false);
                        setUsername(newUsername);
                    }
                    return response.json();
                }).then(data => {

                    return data;
                })
                .catch(error => {
                    console.log("Error when submitting the response!");
                    throw new Error(error);  // ***
                });  
            props.handleLogin(result);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        var temp = warnings;
        if (!username || username === '') {
            temp[3] = "Please enter username";
        }
        if (!password || password === '') {
            temp[4] = "Please enter password";
        }
        setWarnings(prevWarnings => [...prevWarnings, ...temp]);

        if (username && password) {
            const inputData = { username: username, password: password};
            const url = preurl + '/users/login';
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
                    if (response.status === 201) {
                        setisSigned(true);
                        setShowform(false);
                    }
                    return response.text()
                }).then(data => {
                    console.log(data);
                    setUsername(username);
                    props.handleLogin(data);
                })
                .catch(error => {
                    console.log("Error when submitting the response!");
                    throw new Error("HTTP error " + error);  // ***
            });  
            console.log('----------------------------');
        }
    }

    async function handleLogout(e) {
        e.preventDefault();
        setisSigned(false);
        props.handleSignout();
    }

    return (
        <div> 
            { showForm ?
            <div className='container-login'>
                <button onClick={() => setShowform(false)}>Close the Form </button>
                <p>{showForm.toString()} {isSigned.toString()} </p>
                <form style={signupStyle} onSubmit={handleCreate}>
                    <label>Enter your Username:
                        <input type="text" value={newUsername} onChange={(e) => setNewusername(e.target.value)}/>
                        <p>{warnings[0]}</p>
                    </label>
                    <label>Enter your Password:
                        <input type="text" value={newPassword} onChange={(e) => setNewpassword(e.target.value)}/>
                        <p>{warnings[1]}</p>
                    </label>
                    <label>Enter your Email:
                        <input type="text" value={newEmail} onChange={(e) => setNewemail(e.target.value)}/>
                        <p>{warnings[2]}</p>
                    </label>
                    <input type="submit" value="Create an Account" />
                    <div>Already Registered?<button>Sign In</button></div>
                </form>

                <form style={loginStyle} onSubmit={handleSubmit}>
                    <label>Enter your Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <p>{warnings[3]}</p>
                    </label>

                    <label>Enter your Password:
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <p>{warnings[4]}</p>
                    </label>

                    <input type="submit" value="Login"/>
                </form>
            </div>
            : isSigned ? <div className='div-signin' >{user.user.username} | {username} You're now signed in. Click to <button onClick={handleLogout}>Sign Out</button></div> 
                : <button onClick={() => setShowform(true)} style={loginButton}>Click to Login</button> 
        } 

        </div>
    )
}

export default LoginSignUp;