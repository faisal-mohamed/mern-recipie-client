import { useState } from "react"
import Axios from 'axios';
import {useCookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    return <div className="auth">
        <Login/>
        <Register/>
    </div>
}

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_,setCookie] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            
           const response =  await Axios.post("http://localhost:5000/auth/login", {username, password});
          //Here the response.data.token and response.data.userID is obtained from the backend router.post(login) request as a response. for more insight see the server logic of post login request
           setCookie("access_token", response.data.token);
           window.localStorage.setItem("UserID", response.data.userID);
           navigate('/');

        } catch (error) {
            console.log(error);
            alert('Sorry, an error ocurred, Please retry');
        }
    }

    return <div>
         
        <Form  username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Login" handleSubmit={handleSubmit}/>
    </div>
}

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
            event.preventDefault();
           try {
            await Axios.post("http://localhost:5000/auth/register", {username, password});
            alert("Registration Successfull !, Now Login :)");
           } catch(err) {
            console.log(err);
           }
    }

    return <div>
        <Form  username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" handleSubmit={handleSubmit}/>
    </div>
}

const Form = ({username, setUsername, password, setPassword, label, handleSubmit}) => {
    return <div className="auth-container">
        <h1>{label}</h1>
      <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            
            <button type="submit">Register</button>
        </form>
    </div>
}