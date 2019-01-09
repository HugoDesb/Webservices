var request = require('request-json');
var client = request.createClient('http://localhost:8100/');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// connection à la BD
mongoose.connect('mongodb://localhost/Search', function(err) {
    if(err) {throw err;}
    else
        console.log('mongo est connecté');
});

/// declare schema user
var DocSchema = Schema({
        titre:String,
        author : [String],
        uri : String,
        instName: [String],
        labName: [String]
  });
  
var model = mongoose.model('docsSearch', DocSchema);

module.exports = {
    searchByLab: function(query, cb){
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

    getByLab : function(query,cb){
        model.find(
            {"labName": {"$regex": query, "$options":"i"}},
            'titre author uri instName labName').lean().exec(function(err,res){
            if(err) {
                throw err;
            } else {
                if(res.length != 0){
                    cb(res);
                } else {
                    module.exports.searchByLab(query,cb);
                }
            }
        })
    },

    searchByUniversity: function(query, cb){
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
    },

    getByUniversity : function(query,cb){
        model.find(
            {"instName": {"$regex": query, "$options":"i"}},
            'titre author uri instName labName').lean().exec(function(err,res){
            if(err) {
                throw err;
            } else {
                if(res.length != 0){
                    cb(res);
                } else {
                    module.exports.searchByUniversity(query,cb);
                }
            }
        })
    },

    searchByTitle: function(query, cb){
        
        client.get('http://api.archives-ouvertes.fr/search/?q=title_t:'+query+'&fl=title_s,authFullName_s,uri_s,instStructName_s,labStructName_s',function(err, res, body) {
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
            var docsToSave = new model(elt);
            docsToSave.save(function(err){
                if(err){
                    throw err;
                }
            });
        });
            cb(listeElement);
        });

        
    },

    getByTitle : function(query,cb){
        model.find(
            {"titre": {"$regex": query, "$options":"i"}},
            'titre author uri instName labName').lean().exec(function(err,res){
            if(err) {
                throw err;
            } else {
                if(res.length != 0){
                    cb(res);
                } else {
                    module.exports.searchByTitle(query,cb);
                }
            }
        })
    }
};