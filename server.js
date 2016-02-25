var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/smartdonation');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    return res.render('index');
});

app.post('/signup', function (req, res) {
    var email = req.body.email;
    var collection = db.get('emails');
    collection.insert({
        email: email
    }, function (err, doc) {
        if (err) {
            console.log('Error signing up: ' + err.message);
            return res.send(500, 'Problem signing up');
        }
        console.log('New signup: ' + email);
        return res.redirect('/');
    });
});
