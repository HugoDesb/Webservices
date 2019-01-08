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
var LabSchema = Schema({
    titre:String,
    author : [String],
    uri : String,
    instName: [String],
    labName: [String]
  });
  
var model = mongoose.model('labSearch', LabSchema);


module.exports = {
    searchLab: function(query, cb){
        client.get('http://api.archives-ouvertes.fr/search/?q=labStructName_t:'+query+'&fl=title_s,authFullName_s,uri_s,instStructName_s,labStructName_s',function(err, res, body) {
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
                var lab = new model(elt);
                lab.save(function(err){
                    if(err){
                        throw err;
                    }
                })
                });
            cb(listeElement);
        });
    },

    getLab : function(query,cb){
        model.find(
            {"labName": {"$regex": query, "$options":"i"}},
            'titre author uri instName labName').lean().exec(function(err,res){
            if(err) {
                throw err;
            } else {
                if(res.length != 0){
                    cb(res);
                } else {
                    module.exports.searchLab(query,cb);
                }
            }
        })
    }
};