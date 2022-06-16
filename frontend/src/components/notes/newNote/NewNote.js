import React, {useState, useContext} from 'react';
import AuthContext from "../../../context/AuthProvider"
import './NewNote.css';


function NewNote(props){

    const context = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTag] = useState('');
    const [publicType, setPublicType] = useState(false);

    const changeTitleHandler = event => {
        const value = event.target.value;
        setTitle(value);
    };

    const changeDescriptionHandler = event => {
        const value = event.target.value;
        setDescription(value);
    };

    const changeImageHandler = event => {
        const value = event.target.value;
        setImage(value);
    };
    
    const changeTagHandler = event => {
        const value = event.target.value;
        setTag(value);
    };

    const addNote = () => {
        // eslint-disable-next-line no-restricted-globals
        if(!confirm("Czy chcesz dodać nowy zasób?"))
            return

        const note = {
            title: title,
            body: description,
            image: image,
            owner: context.auth.accessToken,
            tags: tags,
            publicType: publicType
        };

        props.onAdd(note)

        setTitle('')
        setDescription('')
    }

    return(
        <div className = "newNote">
            <p className = 'addNote'>Dodaj nowy zasób!</p>
            <label>Tytuł notatki:</label>
            <input
                type="text" 
                value = {title} 
                onChange={changeTitleHandler}
            />
            <br/>

            <label>Opis notatki:</label>
            <input
                type="text" 
                value = {description}
                onChange={changeDescriptionHandler}
            />
            <br/>
            <label>Url do zdjęcia:</label>
            <input
                type="text" 
                value = {image}
                onChange={changeImageHandler}
            />
            <br/>
            <label>Tagi:</label>
            <input
                type="text" 
                placeholder = "Użyj ; między tagami"
                value = {tags}
                onChange={changeTagHandler}
            />
            <br/>
            <label>Publiczny:</label>
            <input
                type="checkbox" 
                placeholder = "Użyj ; między tagami"
                defaultChecked={publicType}
                onChange={() => setPublicType(!publicType)}
            />
            <br/>

            <button onClick = {() => addNote()}>Dodaj notatke</button>
        </div>
    );
}

export default NewNote;