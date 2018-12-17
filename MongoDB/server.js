var express = require('express');
var path = require('path');
var uuidv4 = require("uuid/v4");

var bodyParser = require('body-parser');

var dataLayer = require('./repo/dataLayer.js');
var dataDocument = require('./repo/dataDocumentSILO.js')

var request = require('request-json');
var client = request.createClient('http://localhost:8100/');

var app = express();
var port = 8100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/search/author', function(request, response){
    var data = {
        q: req.body.query
    };
})

app.post('/search/docs', function(req, res){
    dataDocument.getDocs(req.body.query, function(docSet){
        res.send(docSet);
    })
})

console.log("Server started port 8100");

app.listen(port);

