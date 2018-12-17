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


app.post('/addAccount', function (req, res) {
    if(!req.body.username || !req.body.password){
                res.send(
                    {
                        success:false,
                        errorSet:['USERNAME_OR_PASSWORD_EMPTY']
                    }
                );
            }else{
                var user = {
                    username:req.body.username,
                    password:req.body.password
                };
                dataTaskLayer.addAccount(user, function(success){
                    res.send({ success:success, username:user.username});
        });
    }
});

app.post('/findAccount', function (req, res) {
    if(!req.body.username || !req.body.password){
        res.send(
            {
                success:false,
                errorSet:['USERNAME_OR_PASSWORD_EMPTY']
            }
        );
    }else{
        var user = {
            username:req.body.username,
            password:req.body.password
        };
        dataTaskLayer.findAccount(user, function(username){
            // temporaire
            var s = {
                success: (username != null),
                username :username
            };
            res.send(s);
        });
    }
});

app.post('/getTaskSet/:username', function(req, res){
    dataTaskLayer.getTaskSet(req.params.username, function(taskSet){
        var obj = {
            success:true,
            taskSet : taskSet
        };
        res.send(obj);
    });
});

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

app.post('/findById', function(req,res){
    if(!req.body.id){
        res.send(
            {
                success:false,
                errorSet:['ID_IS_EMPTY']
            }
        );
    }else{
        dataTaskLayer.findTaskById(req.body.id,function(status){
            res.send({ success:status });
        });
    }
});

app.post('/updateTask', function(req,res){
    if(!req.body.name && !req.body.done && !req.body.id){
        res.send(
            {
                success:false,
                errorSet:['ONE_VALUE_IS_EMPTY']
            }
        );
    }else{
        var task = {
            id:req.body.id,
            name:req.body.name,
            done:req.body.done
        };
        dataTaskLayer.updateTask(task, function(){
            res.send({ success:true });
        });
    }
});

app.post('/addTask', function(req, res){

    if(!req.body.name){
        res.send(
            {
                success:false,
                errorSet:['TASKNAME_EMPTY']
            }
        );
    }else{
        var task = {
            id:uuidv4(),
            name:req.body.name,
            done:false,
            username: req.body.username
        };
        dataTaskLayer.addTask(task, function(){
            res.send({ success:true, task:task });
        });
    }
});


app.post('/deleteTask', function(req,res){
    if(!req.body.id){
        res.send(
            {
                success:false,
                errorSet:['ID_EMPTY']
            }
        );
    }else{
        dataTaskLayer.findTaskById(req.body.id,function(){
            dataTaskLayer.deleteTaskById(req.body.id, function(){
                res.send({ success:true });
            });
        })
    }
});

console.log("Server started port 8100");

app.listen(port);

