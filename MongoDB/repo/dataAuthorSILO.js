var request = require('request-json');
var client = request.createClient('http://localhost:8100/');

module.exports = {
    searchAuthor: function(query, cb){
        client.get('https://api.archives-ouvertes.fr/ref/author?q='+query,function(err, res, body) {
            cb(res.body);
        });
    }
};