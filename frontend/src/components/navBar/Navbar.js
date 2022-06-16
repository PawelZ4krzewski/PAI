import {useContext } from 'react';
import AuthContext from "../../context/AuthProvider"
import {useNavigate} from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import './Navbar.css'

const Navbar = () => {

    const {auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate()



    const login  = () => {
        navigate("/login")
    }
    const logout  = () => {
        setAuth('')
        navigate("/login")
    }

    return(
        <div className = 'navbar'>{
                !auth.accessToken
                ?
                <button onClick={login}>Login</button>
                :
                <button onClick={logout}>Logout</button>
            }
        </div>
    )
}  

export default Navbar 