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
var AuthorSchema = Schema({
    authorFullName: {type:String, unique:true},
    coAuthorFullName: [String]
});
  
var model = mongoose.model('authorSearch', AuthorSchema);

function addCoAuthor(author, coauthor){
    model.updateOne(
        { "authorFullName": author },
        { $addToSet: { "coAuthorFullName": coauthor } },
        { upsert: true },
        function(err){
            if(err){
                throw err;
            }
        }
     )
};


module.exports = {
    searchAuthorOnHAL: function(query,cb){
        client.get('http://api.archives-ouvertes.fr/search/?q=authFullName_t:'+query+'&fl=authFullName_s',function(err, res, body) {
            data = JSON.parse(res.body);

            data.response.docs.forEach(doc => {
                doc.authFullName_s.forEach(authorA => {                    
                    doc.authFullName_s.forEach(authorB => {
                        if(authorA != authorB){
                            addCoAuthor(authorA, authorB);
                        }
                    });
                });
            });

            module.exports.getAuthor(query, cb);
        });
        
    },

    getAuthor: function(query, cb){
        model.find(
            {"authorFullName": {"$regex":query, "$options": "i"}},
            'authorFullName coAuthorFullName').lean().exec(function(err,res){
            if(err) {
                throw err;
            } else {
                if(res.length != 0){
                    cb(res);
                } else {
                    module.exports.searchAuthorOnHAL(query,cb);
                }
            }
        })
    }
        
    
};