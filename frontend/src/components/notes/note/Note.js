import React, {useContext} from 'react';
import AuthContext from "../../../context/AuthProvider"
import {useNavigate} from 'react-router-dom';
import './Note.css';



function Note(props){

    const context = useContext(AuthContext);

    const navigate = useNavigate()

    const editHandler = () => {
        props.onEdit({
            _id: props._id,
            title: props.title,
            body: props.body,
            image: props.image,
            owner: props.owner,
            tags: props.tags,
            publicType: props.publicType
        });
    }

    return (
    <div className = 'note'>
        <div className = "imageNote">
            {props.image != '' ? 
                <img src ={props.image} />
                :
                <span></span>
            }
        </div>
        <div className = "textNote">

            <p  className = 'title' onClick = {() => navigate('/notes/'+props._id)}>{props.title}</p>
            <div className = "description">
                {props.body}
            </div>
            {(props.owner === context.auth.accessToken && props.owner && context.auth.accessToken) || props.shared ?
                
                <div>
                    <button
                    className = 'edit'
                    onClick = {editHandler}>Edytuj</button>

                    <button
                    className = 'delete'
                    onClick = {() => {props.onDelete(props._id)}}>Usuń</button>
                </div>
                
                :
                
                <br/>
            }
            {   !props.shared && props.owner === context.auth.accessToken && props.owner && context.auth.accessToken?
                <button
                className = 'share'
                onClick = {() => navigate('/notes/shared/'+props._id)}>Udostępnij</button>
                :
                <br/>
            }
        </div>
    </div>
);
}

export default Note;