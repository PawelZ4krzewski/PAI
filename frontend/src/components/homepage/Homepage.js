import {useNavigate} from 'react-router-dom';
import './Homepage.css'

const Homepage = () => {

    const navigate = useNavigate()


    const login  = () => {
        navigate("/login")
    }
    
    const tryNotes  = () => {
        navigate("/notes")
    }

    return(
        <div id = 'home-div'>
            <h1> MyTextResources</h1>
            <div className='info'>
                <p>Ta strona służy do zarządzania zasobami tekstowymi. 
                    <br/>
                    <span onClick={login}> Zaloguj się</span> lub 
                    <span onClick={tryNotes}> spróbuj jako gość</span> już teraz!
                </p>

            </div>
        </div>
    )
}  

export default Homepage 