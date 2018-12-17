//declaration
var mongoose = require("mongoose");
var uuidv4 = require("uuid/v4");
var Schema = mongoose.Schema;
//for generate GUID
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
    done:Boolean
});

//Init model
var TaskModel = mongoose.model('tasks', TaskSchema);

//get all tasks
TaskModel.find(null, function (err,tasks) {
   if(err){
       throw err;
   } else {
       console.log(tasks);
   }
});