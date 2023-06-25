import React, { useState } from 'react';

const LoginSignUp = props => {
    const [loading, setLoading] = useState(0);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        console.log(`The name you entered was: ${username}`)

    }
    return (
        <div> 
            <form onSubmit={handleSubmit}>
                <label>Enter your Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>Enter your Password:
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label>Enter your Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>

                <p>Already Registered?<button>Sign In</button></p>

                <input type="submit" />
            </form>
        </div>
    )
}

export default LoginSignUp;