var express = require('express');
var path = require('path');
var uuidv4 = require("uuid/v4");

var bodyParser = require('body-parser');

var dataDocumentLayer = require('./repo/dataDocumentSILO.js');
var dataAuthorLayer = require('./repo/dataAuthorSILO.js');
var dataUniversityLayer = require('./repo/dataUniversitySILO.js');
var dataLabLayer = require('./repo/dataLabSILO.js');


var app = express();
var port = 8100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/search/author', function(req, res){
    dataAuthorLayer.searchAuthor(req.body.query, function(docSet){
        res.send(docSet);
    })
})

app.post('/search/docs', function(req, res){
    dataDocumentLayer.searchDocs(req.body.query, function(docSet){
        res.send(docSet);
    })
})

console.log("Server started port 8100");

app.listen(port);

