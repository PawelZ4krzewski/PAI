import React, {useContext} from 'react';
import Note from './note/Note';
import NewNote from './newNote/NewNote';
import Filtr from './filtr/Filtr';
import EditNote from './editNote/EditNote';
import Modal from 'react-modal';
import axios from '../../axios';
import Navbar from '../navBar/Navbar';
import AuthContext from "../../context/AuthProvider"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Notes.css';

class Notes extends React.Component {


    static contextType = AuthContext

    constructor(props){
        super(props);

        this.state = {
            allNotes : [],
            notes : [],
            showEditModal: false,
            editNote: {},
        };
    }

    componentDidMount(){
        // const {auth, setAuth } = useContext(AuthContext);

        console.log(this.context)
        this.fetchNotes();
    }

    async fetchNotes(){
        const res = await axios.get('/notes/user/'+this.context.auth.accessToken);
        const notes = res.data;
        this.setState({allNotes: notes})
        this.setState({notes});

        console.log(res);
    }

    async deleteNote(_id){
        // eslint-disable-next-line no-restricted-globals
        if(!confirm("Czy chcesz usunąć zasób?"))
            return

        console.log('usuwanie notatki o id: '+_id)

        await axios.delete('/notes/'+_id);

        const notes = [...this.state.notes].filter(note => note._id !== _id)
        this.setState({notes})
    }

    async addNote(note){
        console.log('DODAJE')
        console.log(note)
        const notes = [...this.state.notes];
        try{
            //add to backend
            const res = await axios.post('/notes/', note);
            const newNote = res.data;
            //add to frontend
            notes.push(newNote);
            this.setState({notes});
        }
        catch (err) {
            NotificationManager.error(err.response.data.message);
            console.log(err.response.data)
        }
        
    }

    async editNote(note){

        console.log("EDYTUJE")
        console.log(note)
        await axios.put('/notes/'+note._id,note);

        const notes = [...this.state.notes];
        const index = notes.findIndex(x => x._id === note._id);

        if(index >= 0) {
            notes[index] = note;
            this.setState({notes});
        }
        this.toggleModal()
    }

    toggleModal(){
        this.setState({
            showEditModal: !this.state.showEditModal
        });
    }
    
    editNoteHandler(note){
        this.toggleModal();
        this.setState({editNote: note});
        console.log('EDYTOWANA:')
        console.log(note)
    }

    filtrNotes(filtr){
        
        this.setState({notes: this.state.allNotes})
        
        console.log(filtr.tags)

        if(filtr.title){
            const notes = [...this.state.notes].filter(note => note.title === filtr.title)
            this.setState({notes})
        }

        if(filtr.body !== ''){
            const notes = [...this.state.notes].filter(note => note.body === filtr.body)
            this.setState({notes})
        }
        if(filtr.tags !== ''){
            const tags = filtr.tags.split(';');
            const notes = [...this.state.notes].filter(note => {
                if(!note.tags){
                    return false;
                }  
                const noteTags = note.tags.split(';')
                // console.log(noteTags)
                const isThereAnyTagMatching = tags.map(tag => noteTags.includes(tag))
                    .reduce((multiFlag, flag) => multiFlag || flag);
                return isThereAnyTagMatching;
            })
            this.setState({notes})
        }

        if(filtr.my){
            const notes = [...this.state.notes].filter(note => note.owner === this.context.auth.accessToken)
            this.setState({notes})
        }
        
    }


    render(){

      return(  
        <div>
            <Navbar/>
            <NotificationContainer/>
            {this.context.auth.accessToken
                ?
                <NewNote 
                onAdd = {(note) => this.addNote(note)}
                />
                :
                <br/>
            }

            <Filtr onFiltr = {(filtr) => this.filtrNotes(filtr)}/>

            <Modal className = 'modal'
                ariaHideApp={false}
                isOpen = {this.state.showEditModal}
                contentLabel = "Edytuj notatkę">
                <EditNote
                    _id = {this.state.editNote._id}
                    title = {this.state.editNote.title}
                    body = {this.state.editNote.body}
                    image = {this.state.editNote.image}
                    owner = {this.state.editNote.owner}
                    tags  = {this.state.editNote.tags}
                    publicType  = {this.state.editNote.publicType}
                    onEdit = {note => this.editNote(note)}
                />
                <button className = 'cancel' onClick={() => this.toggleModal()}>Cancel</button>
            </Modal>

            {this.state.notes.map(note =>  (
                <Note 
                key = {note._id}
                _id = {note._id}
                title = {note.title}
                body = {note.body}
                image = {note.image}
                owner = {note.owner}
                publicType = {note.publicType}
                tags = {note.tags}
                onEdit = {(note) => this.editNoteHandler(note)}
                onDelete = {(_id) => this.deleteNote(_id)}
                />
                ))}
        </div>
        );
    }
}

export default Notes 