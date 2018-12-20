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

app.post('/search/lab', function(req, res){
    dataLabLayer.searchLab(req.body.query, function(publicationSet){
        res.send(publicationSet);
    })
});

app.post('/search/university', function(req, res){
    dataUniversityLayer.searchUniversity(req.body.query, function(publicationSet){
        res.send(publicationSet);
    })
});

app.post('/search/author', function(req, res){
    dataAuthorLayer.searchAuthor(req.body.query, function(authorSet){
        var auteurs = [];
        if(authorSet[0] != null){
            var monAuteur = authorSet[0].authFullName_s[0];
            
            authorSet.forEach(doc => {
                if(doc.authFullName_s.indexOf(monAuteur)>=0){
                    doc.authFullName_s.forEach(auth =>{
                        if(auth != monAuteur && auteurs.indexOf(auth)<0){
                            auteurs.push(auth);
                        }
                    });
                }
            });
        }
        //auteurs.shift();
        console.log(auteurs);
        res.send(auteurs);
    });
});

app.post('/search/docs', function(req, res){
    dataDocumentLayer.searchDocs(req.body.query, function(publicationSet){
        res.send(publicationSet);
    })
})

console.log("Server started port 8100");

app.listen(port);

