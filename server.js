var express = require('express');
var path = require('path');
var uuidv4 = require("uuid/v4");

var bodyParser = require('body-parser');

var dataDocumentLayer = require('./repo/dataDocumentSILO.js');
var dataAuthorLayer = require('./repo/dataAuthorSILO.js');



var app = express();
var port = 8100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/search/lab', function(req, res){
    dataDocumentLayer.getByLab(req.body.query, function(publicationSet){
        res.send(publicationSet);
    })
});

app.post('/search/university', function(req, res){
    dataDocumentLayer.getByUniversity(req.body.query, function(publicationSet){
        res.send(publicationSet);
    })
});

app.post('/search/author', function(req, res){
    dataAuthorLayer.getAuthor(req.body.query, function(authorSet){
        res.send(authorSet);
    });
});

app.post('/search/docs', function(req, res){
    console.log(req.body.query);
    dataDocumentLayer.getByTitle(req.body.query, function(publicationSet){
        res.send(publicationSet);
    })
})  

console.log("Server started port 8100");

app.listen(port);

