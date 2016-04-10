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

module.exports = router;
