var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

//find better solution for that
/* GET home page. */
router.get('/', function (req, res, next) {
    Note.find(function (err, notes) {
        if (err) {
            return next(err);
        }
        res.render('index', { user: { name: 'Chris' }, notes: notes });
    });
});

router.get('/create', function (req, res, next) {
    res.render('create', { user: { name: 'Chris' } });
});

// todo: auf jeden fall note find by id auslagern!!!
router.get('/edit/:id', function (req, res, next) {

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
            //console.log(note);
            res.render('edit', { user: { name: 'Chris' }, note: note });
            return;
        }
    });

});

module.exports = router;
