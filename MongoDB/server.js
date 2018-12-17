var express = require('express');
var path = require('path');
var uuidv4 = require("uuid/v4");

var bodyParser = require('body-parser');

var dataDocumentLayer = require('./repo/dataDocumentSILO.js');
var dataAuthorLayer = require('./repo/dataCoAuthorSILO.js');
var dataUniversityLayer = require('./repo/dataUniversitySILO.js');
var dataLabLayer = require('./repo/dataLabSILO.js');


var app = express();
var port = 8100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

searchLab


app.post('/search/lab', function(req, res){
    dataLabLayer.searchLab(req.body.query, function(publicationSet){
        res.send(publicationSet);
    })
});

app.post('/search/university', function(req, res){
    dataLabLayer.searchUniversity(req.body.query, function(publicationSet){
        res.send(publicationSet);
    })
});

app.post('/search/author', function(req, res){
    dataAuthorLayer.searchAuthor(req.body.query, function(authorSet){
        res.send(authorSet);
    })
});

app.post('/search/docs', function(req, res){
    dataDocumentLayer.searchDocs(req.body.query, function(publicationSet){
        res.send(publicationSet);
    })
})

console.log("Server started port 8100");

app.listen(port);

