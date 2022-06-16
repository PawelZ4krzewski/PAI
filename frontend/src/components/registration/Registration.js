import { useState } from 'react';
import axios from '../../axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useNavigate} from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import './Registration.css';



const Registration = () => {

    const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [repeatPassword, setRepPwd] = useState('');
    const [color, setColor] = useState('');

    const navigate = useNavigate()

    const onSubmit = async (event) =>{
        event.preventDefault()
        if(username === '' || email === '' || password === '' || repeatPassword === ''){
            NotificationManager.error("All fields are required");
        }
        else if(repeatPassword !== password){
            NotificationManager.error("Passwords don't match.");

        }
        else{
            try{
                const registered = {
                    username : username,
                    password : password, 
                    email : email,
                    color : color
                }
                // console.log(registered)
                const res = await axios.post('/signup',registered)
                // console.log(res)
                NotificationManager.success("Utworzono użytkownika"+username, 'Pomyślnie utworzono użytkownika!');
                navigate("/")
            }
            catch (err) {
                NotificationManager.error(err.response.data.message);
                console.log(err)
            
            }
        }
        
    }

    
    return(
        <div className='registration-div'>
            <form onSubmit={onSubmit}>
                <p>REJESTRACJA</p>
                <NotificationContainer/>
                <input 
                    id = 'usernameInput'
                    type = "text"
                    placeholder = "username"
                    onChange = {(e) => setUser(e.target.value)}
                />
                <br/>
                <input 
                    id = 'emailInput'
                    type = "text"
                    placeholder = "email"
                    onChange = {(e) => setEmail(e.target.value)}

                />
                <br/>
                <input 
                    id = 'colorInput'
                    type = "text"
                    placeholder = "Favourite color"
                    onChange = {(e) => setColor(e.target.value)}

                />
                <br/>
                <input 
                    id = 'passwordInput'
                    type = "password"
                    placeholder = "password"
                    onChange  = {(e) => setPwd(e.target.value)}
                />
                <br/>
                <input 
                    id = 'repeatPassword'
                    type = "password"
                    placeholder = "repeat password"
                    onChange  = {(e) => setRepPwd(e.target.value)}
                />
                <br/>
                <input 
                    className='addUserButton'
                    type ='submit'
                    value = 'Register'
                />

            </form>
        </div>
    )
     
}

export default Registration 