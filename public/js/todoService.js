AppHAL.factory('todoService',['$http',function($http){
    var server = {};



    server.searchLab = function(query,cb){
       
        var req = {
            query:query
        }
        $http.post('/search/lab', req)
        .then(function(res){
            console.log("serviceLab");
            cb(res.data);
        });
        
       
    };

    server.searchUniversity = function(query,cb){
       
        var req = {
            query:query
        }
        $http.post('/search/university', req)
        .then(function(res){
            console.log("serviceUniv");
            cb(res.data);
        });
        
       
    };

    server.searchAuthor = function(query,cb){
       
        var req = {
            query:query
        }
        $http.post('/search/author', req)
        .then(function(res){
            console.log("serviceAut");
            cb(res.data);
        });
        
       
    };

    server.searchDocs = function(query,cb){
       
        var req = {
            query:query
        }
        $http.post('/search/docs', req)
        .then(function(res){
            console.log("serviceDocs");
            cb(res.data);
        });
        
       
    };



    return server;
}]);