import { useState } from 'react';
import axios from '../../axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {useNavigate} from 'react-router-dom';
import './ChangePassword.css';



const ChangePassword = () => {

    const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [color, setColor] = useState('');

    const navigate = useNavigate()

    const onSubmit = async (event) =>{



        event.preventDefault()
        if(username === '' || email === '' || color === '' || password === ''){
            NotificationManager.error("All fields are required");
        }
        else{
            try{
                const response = await axios.post('/user',{username: username});
                console.log(response)

                if(email === response.data.email && color === response.data.color){
                    await axios.put('/user/'+response.data._id,{password:password});                    NotificationManager.error("Incorrect data.");
                    NotificationManager.success("Correct password change");
                    navigate("/")
                }
            }
            catch(err){
        
            }
        }
        
    }

    
    return(
        <div className = "changepassword-div">
            <p>ZMIEŃ HASŁO</p>
            <form onSubmit={onSubmit}>
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
                    type = "text"
                    placeholder = "password"
                    onChange  = {(e) => setPwd(e.target.value)}
                />
                <br/>

                <input 
                    className='addUserButton'
                    type ='submit'
                    value = 'Change password'
                />

            </form>
        </div>
    )
     
}

export default ChangePassword 