todoApp.controller("connexionCtrl", ["$scope", "$http", 'todoService', function($scope, $http, todoService){

  $scope.addAccount = function(){
      // Ajout dans la liste

      todoService.addAccount($scope.username, $scope.password, function(res){
          if(res){
              console.log(res);
              if(res.success){
                  console.log("user added");
                  $scope.$parent.connected = res.success;
                  $scope.$parent.error = false;
                  $scope.$parent.username = res.username;
                  $scope.$parent.$emit("LoadTasksEvent",{});
              }else{
                  $scope.$parent.error = true;
                  $scope.$parent.password = "";
              }
          }
      });
  };

  $scope.connect = function () {
      todoService.findAccount($scope.username, $scope.password, function(res){
          if(res){
              console.log(res);
              if(res.success){
                  console.log("user connected");
                  $scope.$parent.connected = res.success;
                  $scope.$parent.error = true;
                  $scope.$parent.username = res.username;
                  $scope.$parent.$emit("LoadTasksEvent",{});
              }else{
                  $scope.$parent.error = true;
                  $scope.$parent.password = "";
              }
          }
      });
  }
}]);
