const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    owner: {
        type:String,
        required: true
    },
    tags: {
        type:String
    },
    publicType: {
        type: Boolean
    }
});

NoteSchema.index({ title: 1, owner: 1 }, { unique: true });


const Note = mongoose.model('Note', NoteSchema);

module.exports = Note 