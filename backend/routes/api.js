const express = require('express');
const router = express.Router();

const noteActions = require('../actions/api/noteActions');
const userActions = require('../actions/api/userActions');

//get notes
router.get('/notes', noteActions.getAllNotes)

//get note
router.get('/notes/:id', noteActions.getNote)

//get note
router.get('/notes/user/:id', noteActions.getUserNotes)

//add notes 
router.post('/notes', noteActions.saveNote)

//update notes
router.put('/notes/:id', noteActions.updateNote)

//delete notes
router.delete('/notes/:id', noteActions.deleteNote)


//Users

//add user
router.post('/signup', userActions.saveUser)

//auth user
router.post('/auth', userActions.authUser)

//get user
router.post('/user', userActions.getUser)

//update user
router.put('/user/:id', userActions.updateUser)

module.exports = router;