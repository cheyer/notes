var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

/*
 * create a note
 */
router.post('/create', function (req, res, next) {
    if (req.body.title == "" && req.body.body == "") {
        res.json({ created: false, msg: "Please fill in fields" });
        return;
    }

    // create note from input fields
    var note = new Note(req.body);
    // set not by default set attribute
    note.author = "user";
    note.timecreated = new Date().getTime();

    note.save(function (err, note) {
        if (err) {
            return next(err);
        }
        res.json({ created: true, note: note });
    })
});

// TODO
// replace by router.update / router.put ????
/*
 * update a note by id
 */
router.post('/update/:id', function (req, res, next) {
    var id = req.params.id;
    var title = req.body.title;
    var body = req.body.body;
    var timeedited = new Date().getTime();

    req.newData = { title: title, body: body, timeedited: timeedited };
    // just updates the attributes of the document that are in the newData object
    Note.findOneAndUpdate({ _id: id }, req.newData, { upsert: false }, function (err, note) {
        if (err) {
            res.json({ updated: false, status: 500, error: err });
            return;
        } else {
            res.json({ updated: true, note: note });
            return;
        }
    });
});


// TODO
// replace by router.delete
/*
 * delete a note by id
 */
router.delete('/delete/:id', function (req, res, next) {
    var id = req.params.id; // id given in url is saved in req.params
    
    Note.remove({ _id: id }, function (err) {
        if (!err) {
            res.json({ deleted: true });
            return;
        }
        else {
            res.json({ deleted: false, error: err });
            return;
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
        return;
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
            return;
        } else if (!note) {
            res.json({});
            return;
        } else {
            res.json(note);
            return;
        }
    })
});

module.exports = router;