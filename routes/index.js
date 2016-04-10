var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: {name : 'Chris'}, notes: db.notes});
});

module.exports = router;
