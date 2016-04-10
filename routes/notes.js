var express = require('express');
var router = express.Router();
var db = require('../models/db');



/* makes random 5 char long ID */
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/* finds note by id in array */
function findNote(id) {
    for (var i = 0; i < db.notes.length; i++) {
        if (db.notes[i].id == id) {
            return i;
        }
    }
    return -1;
}



/*
 * create a note
 */
router.post('/create', function (req, res, next) {

    var note = {
        title: req.body.title,
        body: req.body.note,
        color: 'white',
        author: "user",
        archive: false,
        reminder: false,
        timecreated: new Date().getTime(),
        timeedited: null,
        id: makeid()
    };
    db.notes.push(note);
    res.send(note);
});

// TODO
// replace by router.update / router.put ????
/*
 * update a note by id
 */
router.get('/update/:id', function (req, res, next) {
    var id = req.params.id;
    var msg = { noteID: id, updated: false };

    var title = "new title" + id;
    var body = "new body" + id;

    var noteindex = findNote(id);
    if (noteindex != -1) {
        var note = db.notes[noteindex];
        note.title = title;
        note.body = body;
        note.timeedited = new Date().getTime();
        msg.updated = true;
    }

    res.send(msg);
});


// TODO
// replace by router.delete
/*
 * delete a note by id
 */
router.get('/delete/:id', function (req, res, next) {
    var id = req.params.id; // id given in url is saved in req.params
    var msg = { noteID: id, deleted: false };
    var noteIndex = findNote(id);
    // if result of findNote is not -1, the search was successfull and index is saved
    if (noteIndex != -1) {
        // remove note with index from array
        db.notes.splice(noteIndex, 1);
        msg.deleted = true;
    }
    res.send(msg);
});


/* 
 * get all notes
 */
router.get('/', function (req, res, next) {
    var notes = db.notes;
    res.send(notes);
});

/*
 * get note by id
 */
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    var msg = {
        noteID: id,
        found: false,
        note: null
    }
    var noteindex = findNote(id);
    // if note is foundy by index, save it in msg
    if (noteindex != -1) {
        msg.found = true;
        msg.note = db.notes[noteindex];
    }
    res.send(msg);
});

module.exports = router;