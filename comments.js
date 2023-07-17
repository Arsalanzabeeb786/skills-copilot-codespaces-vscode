// Create web server
var express = require('express');
var router = express.Router();

// Create connection to the database
var mysql = require('mysql');
var dbconfig = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);

// Create a new comment
router.post('/', function(req, res, next) {
    // Get parameters
    var user_id = req.body.user_id;
    var post_id = req.body.post_id;
    var content = req.body.content;

    // Create query
    var query = connection.query('insert into comment (user_id, post_id, content) values (?, ?, ?)', [user_id, post_id, content], function(err, rows) {
        if (err) {
            console.error(err);
            throw err;
        }
        res.json({ "result": 1 });
    });
});

// Read all comments
router.get('/', function(req, res, next) {
    // Get parameters
    var post_id = req.query.post_id;

    // Create query
    var query = connection.query('select * from comment where post_id=?', [post_id], function(err, rows) {
        if (err) {
            console.error(err);
            throw err;
        }
        res.json(rows);
    });
});

// Update a comment
router.put('/', function(req, res, next) {
    // Get parameters
    var id = req.body.id;
    var content = req.body.content;

    // Create query
    var query = connection.query('update comment set content=? where id=?', [content, id], function(err, rows) {
        if (err) {
            console.error(err);
            throw err;
        }
        res.json({ "result": 1 });
    });
});

// Delete a comment
router.delete('/', function(req, res, next) {
    // Get parameters
    var id = req.body.id;

    // Create query
    var query = connection.query('delete from comment where id=?', [id], function(err, rows) {
        if (err) {
            console.error(err);
            throw err;
        }
        res.json({ "result": 1 });
    });
});

module.exports = router;