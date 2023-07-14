import React, { useState, useEffect } from 'react';
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
    
    const preurl = props.preurl;
    const [newUsername, setNewusername] = useState("");
    const [newPassword, setNewpassword] = useState("");
    const [newEmail, setNewemail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [warnings, setWarnings] = useState(Array(5).fill(''));

    const [showForm, setShowform] = useState(false);
    const [isSigned, setisSigned] = useState(false);
    const [user, setUser] = useState(props.user);    
    
    // When ranking page is displayed, load comments for those
    useEffect(() => {
        console.log('useEffect() called in loginsingup.js')
        console.log(props.user);
        setUser(props.user);
       
        // Object.keys(new Date()).length === 0
        if (Object.keys(props.user).length === 0) {
            console.log("logging out")
            setisSigned(false);
        } else {
            setisSigned(true);
        }

    }, [props.user]);

    function clearInputs() {
        setNewusername('')
        setNewpassword('')
        setNewemail('')
        setUsername('')
        setPassword('')
        setWarnings(Array(5).fill(''))
    }


    async function handleSignUp(e) {
        e.preventDefault();
        console.log(`handleSignUp()....`)
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
                        setUser(newUsername);
                        clearInputs();
                    }
                    return response.json();
                }).then(data => {
                    console.log(data);
                    return data;
                })
                .catch(error => {
                    console.log("Error when submitting the response!");
                    throw new Error(error);  // ***
                });  
                
            props.handleLogin(result);
        }
    }

    async function handleLogin(e) {
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
                    if (response.status === 201) {
                    }
                    return response.text()
                }).then(data => {
                    setShowform(false);
                    setisSigned(true);
                    setUser(user);
                    props.handleLogin(data);
                    clearInputs()
                })
                .catch(error => {
                    console.log("Error when submitting the response!");
                    throw new Error("HTTP error " + error);  // ***
            });  
        }
    }

    async function handleSignOut(e) {
        e.preventDefault();
        console.log('handleSignOut')
        const url = preurl + '/users/deletetokens';
        console.log(url);
        await fetch(url, {
            method: 'DELETE',
            credentials: "include",
        });
        setisSigned(false);
        props.handleSignout();
    };

    // validate + get new accessToken
    async function refreshToken() {
        console.log('refreshToken')
        const url = preurl + '/users/newaccesstoken';
        console.log(url);
        console.log(user);
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            },
        });
        const result = await response.json();
        props.refreshToken(); 
    }

    return (
        <div> 
            { showForm ?
            <div key={props.user} className='container-login'>
                <button onClick={() => setShowform(false)}>Close the Form </button>
                <form style={signupStyle} onSubmit={handleSignUp}>
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
                </form>

                <form style={loginStyle} onSubmit={handleLogin}>
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

                <button></button>
            </div>
            : isSigned ? 
                <div className='div-signin'> {  } You're now signed in. Click to 
                    <button onClick={handleSignOut}>Sign Out</button>
                </div> 
                : <button onClick={() => setShowform(true)} >Click to Login</button> 
        } 
        </div>
    )
}

export default LoginSignUp;