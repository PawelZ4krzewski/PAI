import React, {useState} from 'react';
import './Filtr.css';

function Filtr(props){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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

    const changeTagHandler = event => {
        const value = event.target.value;
        setTag(value);
    };


    const filtrNote = () => {
        const filtr = {
            title: title,
            body: description,
            tags: tags,
            my: publicType
        };
        props.onFiltr(filtr);
    }

    return(
        <div className = "filter">
            <p>Filtr zasobów: </p>
            
            <label>Tytuł:</label>
            <input
                type="text" 
                value = {title} 
                onChange={changeTitleHandler}
                />
            <br/>
            <label>Opis:</label>
            <input
                type="text" 
                value = {description}
                onChange={changeDescriptionHandler}
                />
            <br/>
            <label>Tagi:</label>
            <input
                type="text" 
                value = {tags}
                placeholder = "Użyj ; między tagami"
                onChange={changeTagHandler}
                />
            <br/>
            <label>Tylko moje zasoby:</label>
            <input
                type="checkbox" 
                defaultChecked={publicType}
                onChange={() => setPublicType(!publicType)}
            />
            <br/>
            <button onClick = {filtrNote}>Zapisz</button>
            
        </div>
    );
}

export default Filtr;