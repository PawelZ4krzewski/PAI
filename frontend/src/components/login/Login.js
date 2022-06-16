import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../../axios';
import AuthContext from "../../context/AuthProvider"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useNavigate} from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import './Login.css'

const Login = () => {

    const {auth, setAuth } = useContext(AuthContext);

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await axios.post('/auth',{username: username, password: password});
            console.log(response.data)
            const accessToken = response?.data?._id;
            setAuth({username, password, accessToken})
            setUser('')
            setPwd('')
            navigate('/notes');
        }catch(err){
            if(!err?.response){
                NotificationManager.error("No server Response`");
            }else if (err.response?.status === 400){
                NotificationManager.error("Missing Username or Password");
            }else if (err.response?.status === 401){
                NotificationManager.error("Uncorect password");
            }else {
                NotificationManager.error("Login Failed");
            }
        }
    }

    const registration  = () => {
        navigate("/registration")
    }
    const changePassword  = () => {
        navigate("/changepassword")
    }

    return(
        <div id = 'login-div'>
            <form onSubmit={handleSubmit}>
                <NotificationContainer/>
                <label id = 'usernamelabel'>Username:</label>
                <br/>
                <input 
                    id = 'usernameInput'
                    type = "text"
                    placeholder = " username"
                    onChange = {(e) => setUser(e.target.value)}
                /> 

                <br/>
                <label id = 'passwordlabel'>Password:</label>
                <br/>
                <input 
                    id = 'passwordInput'
                    type = "password"
                    placeholder = " password"
                    onChange  = {(e) => setPwd(e.target.value)}
                />
                <br/>
                <input 
                    id='loginButton'
                    type ='submit'
                    value = 'Login'
                />
            </form>
            <p onClick={registration}>Registration</p>
            <p onClick={changePassword}>Change password</p>
        </div>
    )
}  

export default Login 