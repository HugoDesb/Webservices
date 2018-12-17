
todoApp.factory('todoService',['$http',function($http){
  var server = {};

  var serverAddress = 'http://localhost:8095';

  server.addAccount = function(username, password, cb){
    var req = {
        username:username,
        password:password
    } ;
    $http.post(serverAddress+'/addAccount', req)
        .then(function(res){
            cb(res.data);
        });
  };

  server.findAccount = function(username, password, cb){
      var req = {
          username:username,
          password:password
      } ;
      $http.post(serverAddress+'/findAccount', req)
          .then(function(res){
              cb(res.data);
          });
  };

  server.addTask = function (username, name, cb) {
      var req = {
          name:name,
          username:username
      };
      console.log(req);
      $http.post(serverAddress+'/addTask', req)
          .then(function (res) {
              cb(res);
          });
  };

  server.deleteTask = function(id, cb){
      var req = {id: id};
      $http.post(serverAddress+'/deleteTask', req)
          .then(function(res){
              cb(res);
          });
  };

  server.updateTask = function(task, cb){
      var req = {
          id:task._id,
          name:task.name,
          done:task.done
      };
      $http.post(serverAddress+'/updateTask', req)
          .then(function(res){
              cb(res);
          });
  };

  server.getTaskSet = function (username, cb) {
      $http.post(serverAddress+'/getTaskSet/'+username)
          .then(function (resp) {
              console.log(resp.data.taskSet);
              cb(resp.data.taskSet);
          });
  };

  return server;
}]);
