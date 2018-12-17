var request = require('request-json');
var client = request.createClient('http://localhost:8100/');

module.exports = {
    searchAuthor: function(query, cb){
        client.get('http://api.archives-ouvertes.fr/search/?q=authFullName_t:'+query+'&fl=authFullName_s',function(err, res, body) {
            data = JSON.parse(res.body);
            response = data.response.docs;
            cb(response);
        });
    }
};