var AppHAL = angular.module("AppHAL", []);


AppHAL.controller("searchHAL",["$scope", "$http", 'todoService', function($scope, $http, todoService){

    $scope.taskList = [];
    $scope.type = "docs";
    $scope.publication = false;
    $scope.auteur = false;

    $scope.typeLab = function(){

        $scope.type = "lab";
    }
    $scope.typeUniv = function(){

        $scope.type = "univ";
    }
    $scope.typeAut = function(){

        $scope.type = "aut";
    }

    $scope.typeDocs = function(){

        $scope.type = "docs";
    }


    $scope.search = function(){
        
        switch($scope.type){

            case "lab":
                todoService.searchLab($scope.searchBox,function(res){
                    console.log("ok");
                    $scope.infos = res;
                    console.log($scope.infos);
                });
                break;
            
            case "univ":
                todoService.searchUniversity($scope.searchBox,function(res){
                    console.log("ok");
                    $scope.infos = res;
                    console.log($scope.infos);
                });
                break;

            case "aut":
            todoService.searchAuthor($scope.searchBox,function(res){
                console.log("ok");
                $scope.infos = res;
                console.log($scope.infos);
            });
            break;

        default:
        todoService.searchDocs($scope.searchBox,function(res){
            console.log("ok");
            $scope.infos = res;
            console.log($scope.infos);
        });
        break;

        }
        

    };
    
   $scope.showHideP = function(param){
console.log("coucou");
 $scope.publication = param;
 $scope.auteur = !param;
}

$scope.showHideA = function(param){
    $scope.auteur = param;
    $scope.publication = !param
   }





    $scope.howManyDone = function(){
        count = 0;
        $scope.taskList.forEach(element => {
            if(element.done){
                count++
            }
        });
        return count;
    };

    $scope.howManyNotDone = function(){
        return $scope.taskList.length
            -$scope.howManyDone();
    };

    $scope.addTask = function(){
        // Ajout dans la liste

        todoService.addTask($scope.$parent.username, $scope.taskInputName, function(res){
            if(res){
                console.log(res);
                console.log("task added");
                $scope.load();
            }
        });
        $scope.taskInputName = "";
    };

    $scope.update = function(task){

        todoService.updateTask(task, function(res){
            console.log(res);
            $scope.load();
        });
    };

    $scope.delete = function(task){
        var index = $scope.taskList.indexOf(task);
        $scope.taskList.splice(index,1);

        todoService.deleteTask(task._id, function(res){
            console.log(todo);
            $scope.load();
        });
    };

    $scope.store = function(){
        localStorage.setItem("taskList", JSON.stringify($scope.taskList));
    };

    $scope.load = function(){
        todoService.getTaskSet($scope.username, function(res){
            $scope.taskList = res;
        });
    };

    $scope.deconnect = function(){
        $scope.$parent.connected = false;
        $scope.$parent.username = "";
        $scope.$parent.error = false;
        $scope.$parent.password = "";
    };

    $scope.$parent.$on("LoadTasksEvent",function(){
        $scope.load();
    });

    



}]);

AppHAL.controller("connexionCtrl", ["$scope", "$http", 'SearchService', function($scope, $http,searchService){

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

AppHAL.controller("pageCtrl",["$scope",function ($scope) {

    $scope.connected = false;
    $scope.username = "";
    $scope.error = false;
}]);
