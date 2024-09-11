import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
    setToken: Function
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Login = (e:any) => {
        e.preventDefault();        

        axios
        .post("/auth/login", {
            email,
            password
        }, { 
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(function(response){       
            setToken(response.data.token)
        })
        .catch(function(err){
            console.log(err.response.data.message)
        })
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={Login}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;