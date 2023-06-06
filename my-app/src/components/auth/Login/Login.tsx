
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Message from "../../Message/Message";
import Title from "../../Title/Title";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    function submit() {
        const data = {
            email,
            password,
        };

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                localStorage.setItem('userName', json.userName);
                localStorage.setItem("userRole", json.userRole);
                localStorage.setItem("id", json.id);

         navigate("/homepage");
               
            })
            
    }

    return (
        <>
            <Title>
                <h1>Login</h1>
            </Title>

            <div>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="errorMessage">
                    <Message>Incorrect password</Message>
                </div> 
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                onClick={submit}
                className="btn btn-primary">
                Login
            </button>
        </>
    );
}

export default Login;