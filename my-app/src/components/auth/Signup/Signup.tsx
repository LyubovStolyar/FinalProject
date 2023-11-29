import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Title from "../../Title/Title";
import Message from "../../Message/Message";

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    function submit() {
        const data = {
            name,
            email,
            phone,
            password,
        };

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                console.log('registered');
                alert("You are sign in!")
                navigate('/login');
            })
            .catch(err => err.json())
            .then(err => setMessage(err.error));
            console.log(message)
    }

    return (
        <>
        <div className="signUpBody">
           <Title>
                <h1>Sign Up</h1>
           </Title> 

            <div >
                <input
                    className="signUpInput"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <input
                    className="signUpInput"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <input
                    className="signUpInput"
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div>
                <input
                    className="signUpInput"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="errorMessage">
                    <Message message={message}/>
            </div>

            <button 
                className="signUpButton"
                onClick={submit}>
                    Sign Up
            </button>
            </div>
            
        </>
    );
}

export default SignUp;