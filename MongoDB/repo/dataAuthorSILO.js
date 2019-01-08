var request = require('request-json');
var client = request.createClient('http://localhost:8100/');

// var lié à BD mongodb
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// connection à la BD
mongoose.connect('mongodb://localhost/Search', function(err) {
    if(err) {throw err;}
    else
        console.log('mongo est connecté');
});

/// declare schema user
var UserSchema = Schema({
    author : String,
    coauthor : String
  });
  
var model = mongoose.model('authorSearch', UserSchema);


module.exports = {



    searchAuthor: function(query, cb){

        
        client.get('http://api.archives-ouvertes.fr/search/?q=authFullName_t:'+query+'&fl=authFullName_s',function(err, res, body) {
            data = JSON.parse(res.body);

            let listeElement =[];
            data.response.docs.forEach(element => {
                let elt = {
                coauthor : element.authFullName_s
                };
            listeElement.push(elt);

            });
            cb(data.response.docs);
        });
        
    }
        
    
};