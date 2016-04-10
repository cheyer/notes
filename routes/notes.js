var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

/*
 * create a note
 */
router.post('/create', function (req, res, next) {

    // create note from input fields
    var note = new Note(req.body);
    // set not by default set attribute
    note.author = "user";
    note.timecreated = new Date().getTime();

    note.save(function (err, note) {
        if (err) {
            return next(err);
        }
        res.json(note);
    })
});

// TODO
// replace by router.update / router.put ????
/*
 * update a note by id
 */
router.get('/update/:id', function (req, res, next) {
    var id = req.params.id;
    var title = "neuer title";
    var body = "neuer body";
    var timeedited = new Date().getTime();
    
    req.newData = { title: title, body: body, timeedited: timeedited };
    // just updates the attributes of the document that are in the newData object
    Note.findOneAndUpdate({ _id: id }, req.newData, { upsert: false }, function (err, note) {
        if (err) {
            res.json({ updated: false, status: 500, error: err });
        } else {
            res.json({ updated: true, note: note });
        }
    });
});


// TODO
// replace by router.delete
/*
 * delete a note by id
 */
router.get('/delete/:id', function (req, res, next) {
    var id = req.params.id; // id given in url is saved in req.params
    
    Note.remove({ _id: id }, function (err) {
        if (!err) {
            res.json({ deleted: true });
        }
        else {
            res.json({ deleted: false, error: err });
        }
    });
});


/* 
 * get all notes
 */

router.get('/', function (req, res, next) {
    Note.find(function (err, notes) {
        if (err) {
            return next(err);
        }
        res.json(notes);
    });
});



/*
 * get note by id
 */
router.get('/:id', function (req, res, next) {
    var id = req.params.id;

    var query = Note.findById(id);
    query.exec(function (err, note) {
        // sent note if found, else send void object {}
        if (err) {
            res.json({});
        } else if (!note) {
            res.json({});
        } else {
            res.json(note);
        }
    })
});

module.exports = router;