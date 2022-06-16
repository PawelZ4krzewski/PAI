import React, {useEffect, useState} from 'react';
import axios from '../../axios';
import Modal from 'react-modal';
import EditNote from '../notes/editNote/EditNote';
import Note from '../notes/note/Note';
import {useNavigate, useParams} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function OneNote(props){


    const navigate = useNavigate()
    const params = useParams()
    // console.log(params)
    const [note, setNote] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editNoteNote, setEditNoteNote] = useState('');
    
    useEffect(() => {
        fetchNotes()
    },[])

    const fetchNotes = async () => {

        if(params.noteid.length === 24){
            const res = await axios.get('/notes/'+params.noteid);
            const note = res.data;
            if(note === null){
                navigate('/notes')
            }
            setNote(note)
        }else{
            navigate('/notes')
        }
    }

    

    const editNote = async(note) => {

        await axios.put('/notes/'+note._id,note);

        setNote(note)

        toggleModal()
    }

    const toggleModal = () => {
        setShowEditModal(!showEditModal)
    }

    const editNoteHandler = (note) => {
        toggleModal();
        setEditNoteNote(note);
    }
    
    const deleteNote = async(_id) => {
        // eslint-disable-next-line no-restricted-globals
        if(!confirm("Czy chcesz dodać nowy zasób?"))
            return

        await axios.delete('/notes/'+_id);
        navigate("/notes")
    }

    return (
    <div className = 'oneNote'>
        <NotificationContainer/>
        <Modal className = 'modal'
            ariaHideApp={false}
            isOpen = {showEditModal}
            contentLabel = "Edytuj notatkę">
            <EditNote
                _id = {editNoteNote._id}
                title = {editNoteNote.title}
                body = {editNoteNote.body}
                image = {editNoteNote.image}
                owner = {editNoteNote.owner}
                tags  = {editNoteNote.tags}
                publicType  = {editNoteNote.publicType}  
                onEdit = {note => editNote(note)}
            />
            <button className = 'cancel' onClick={toggleModal}>Cancel</button>
        </Modal>
        <Note 
        key = {note._id}
        _id = {note._id}
        title = {note.title}
        body = {note.body}
        image = {note.image}
        shared = {params.type === 'shared'}
        publicType = {note.publicType}
        tags = {note.tags}
        onEdit = {(note) => editNoteHandler(note)}
        onDelete = {(_id) => deleteNote(_id)}
        />
    </div>
);
}

export default OneNote;