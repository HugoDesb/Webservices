var request = require('request-json');
var client = request.createClient('http://localhost:8100/');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/Search', function(err) {
    if(err) {throw err;}
    else
        console.log('mongo est connecté');
});

/// declare schema user
var UniversitySchema = Schema({
    titre:String,
    author : String,
    uri : String,
    instName: String,
    labName: String
  });
  
var model = mongoose.model('universitySearch', UniversitySchema);

module.exports = {
    searchUniversity: function(query, cb){
        client.get('http://api.archives-ouvertes.fr/search/?q=instStructName_t:'+query+'&fl=title_s,authFullName_s,uri_s,instStructName_s,labStructName_s',function(err, res, body) {
            data = JSON.parse(res.body);
            let listeElement =[];
            data.response.docs.forEach(element => {
                let elt = {
                titre : element.title_s,
                author : element.authFullName_s,
                uri: element.uri_s,
                instName: element.instStructName_s,
                labName : element.labStructName_s
                };
            listeElement.push(elt);
            var uni = new model(elt);
                uni.save(function(err){
                    if(err){
                        throw err;
                    }
                })
            });
            cb(listeElement);
        });
    }
};