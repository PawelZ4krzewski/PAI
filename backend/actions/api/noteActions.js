const Note = require('../../db/models/note')

class NoteActions {

    async saveNote(req, res){

        const _title = req.body.title;
        const _body  = req.body.body;
        const _owner  = req.body.owner;
        const _tags  = req.body.tags;
        const _public  = req.body.publicType;
        const _image  = req.body.image;

        let note;

        try{

            note = new Note({
                title: _title,
                body: _body,
                image: _image,
                owner: _owner,
                tags: _tags,
                publicType: _public
                }); 
            
            await note.save();

        } catch(err){
            return res.status(422).json({message: err.message})
        }

        res.status(201).json(note);
        
    }

    async getAllNotes(req, res){
        let doc;
        try{
            doc = await Note.find({});
        } catch(err){
            return res.status(500).json({message: err.message})
        }
        res.status(200).json(doc);
    }

    async getNote(req, res){
        const id = req.params.id;

        const note = await Note.findOne({
            _id: id
        })
        res.status(200).json(note)
    }

    async getUserNotes(req, res){

        const id = req.params.id;
        const userNotes = await Note.find({
            owner: id
        })

        const publicNotes = await Note.find({
            publicType: true
        })
        
        const publicFilteredNotes = publicNotes.filter((note) => {
            return note.owner != id
        })

        const notes = [...userNotes, ...publicFilteredNotes];
        res.status(200).json(notes)

    }

    async updateNote(req, res){

        const id = req.params.id;
        const title = req.body.title;
        const body  = req.body.body;
        const image  = req.body.image;
        const tags  = req.body.tags;
        const publicType  = req.body.publicType;

        const note = await Note.findOne({_id: id});
        note.title = title;
        note.body = body;
        note.image = image;
        note.tags = tags;
        note.publicType = publicType;

        await note.save()

        res.status(201).json(note)
    }

    async deleteNote(req, res){
        const id = req.params.id;

        await Note.deleteOne({_id: id});
        res.sendStatus(204);
    }
}

module.exports = new NoteActions();