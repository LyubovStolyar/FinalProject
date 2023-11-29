
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./Login.css";
import Message from "../../Message/Message";
import Title from "../../Title/Title";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    // const navigate = useNavigate();



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
            .then(res => {
                if(res.status != 200) throw res;
                return res.json();
            })
            .then(json => {
                
                    localStorage.setItem('token', json.token);
                    localStorage.setItem('userName', json.userName);
                    localStorage.setItem("userRole", json.userRole);
                    localStorage.setItem("id", json.id);
                    window.open("/", "_self");        
            })
            .catch(err => err.json())
            .then(err => setMessage(err.error || "Unknown authorization Error!"));
            
    }

    return (
        <>
            <Title>
                <h1>Login</h1>
            </Title>

            <div className="loginGenCont">
                
                <input
                    className="loginInput"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                   
                <input
                    className="loginInput"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
       

            <div className="errorMessage">
                    <Message message={message}/>
            </div> 

            <button
                onClick={submit}
                className="loginButton">
                Login
            </button>

            </div>
        </>
    );
}

export default Login;