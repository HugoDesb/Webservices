/*
//declaration
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//for generate GUID
var uuidv4 = require("uuid/v4");


mongoose.connect('mongodb://localhost/todo', function (err) {
    if(err){
        throw err;
    }else{
        console.log('mongo connected');
    }
});

//declare schema TASK

var TaskSchema = Schema({
    _id:String,
    name:String,
    done:Boolean,
    username: String
});

var UserSchema = Schema({
    username: {type: String, unique:true},
    password : String
});
*/

//Init model
/*
var TaskModel = mongoose.model('tasks', TaskSchema);
var UserModel = mongoose.model('users', UserSchema);
*/

var request = require('request-json');
var client = request.createClient('http://localhost:8100/');

module.exports = {
    getDocs: function(query, cb){
        client.get('https://api.archives-ouvertes.fr/search/?q='+query,function(err, res, body) {
            console.log(res);
            cb(res.body);
        });
    }
};