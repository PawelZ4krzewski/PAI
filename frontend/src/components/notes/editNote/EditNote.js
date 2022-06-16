import React, {useState} from 'react';
import './EditNote.css'
function EditNote(props){

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.body);
    const [image, setImage] = useState(props.image);
    const [tags, setTag] = useState(props.tags);
    const [publicType, setPublicType] = useState(props.publicType);

    console.log(props)
    console.log(tags)
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

    const changeTagsHandler = event => {
        const value = event.target.value;
        setTag(value);
    };

    const editNote = () => {

        // eslint-disable-next-line no-restricted-globals
        if(!confirm("Czy chcesz edytować istniejący zasób?"))
            return
        
        console.log("EditNote Props")
        console.log(props)

        const note = {
            _id: props._id,
            title: title,
            body: description,
            image: image,
            owner: props.owner,
            tags: tags,
            publicType: publicType
        };
        props.onEdit(note);
    }

    return(
        <div className = "editNote">
            <p>Edycja zasobu</p>
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
            <label>Tags:</label>
            <input
                type="text" 
                value = {tags}
                onChange={changeTagsHandler}
            />
            <br/>
            <label>Publiczny:</label>
            <input
                type="checkbox" 
                defaultChecked={publicType}
                onChange={() => setPublicType(!publicType)}
            />
            <br/>
            <button onClick = {() => editNote()}>Save</button>
        </div>
    );
}

export default EditNote;