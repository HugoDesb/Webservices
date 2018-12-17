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

//Init model
var TaskModel = mongoose.model('tasks', TaskSchema);
var UserModel = mongoose.model('users', UserSchema);

module.exports = {
    addAccount: function(user, cb){
        var userToAdd = new UserModel({
            username:user.username,
            password:user.password
        });
        userToAdd.save(function(err){
            if(err){
                cb(false)
            }else{
                cb(true);
            }
        });
    },

    //vérif contenu obj
    // return :: null ou username
    findAccount: function(user, cb){
        var userToFind = {
            username:user.username,
            password:user.password
        };
        UserModel.findOne(userToFind, function (err, userSet) {
            if(err){
                throw err;
            }else{
                if(userSet == null){
                    cb(null);
                }else {
                    cb(userSet.username);
                }
            }
        });
    },

    // RAjouter username
    getTaskSet: function(username, cb){
        TaskModel.find({'username':username}, function (err, taskset) {
            if(err){
                throw err;
            }else{
                cb(taskset);
            }
        });
    },

    findTaskById: function(id, cb){
        TaskModel.findById(id,function(err, task){
            if(err){
                throw err;
            }else{
                if(task!=null){
                    cb();
                }
            }
        });
    },

    updateTask: function(task, cb){
        TaskModel.findByIdAndUpdate(task.id, task, function(err, task){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    // RAjouter username
    addTask: function(task, cb){
        var taskToSave = new TaskModel({
            _id:task.id,
            name:task.name,
            done:task.done,
            username:task.username
        });
        taskToSave.save(function(err){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    deleteTaskById: function(id, cb){
        TaskModel.findByIdAndRemove(id, function(err, todo){
            if (err){
                throw err;
            }else{
                cb();
            }
        });
    }
};