var request = require('request-json');
var client = request.createClient('http://localhost:8100/');

module.exports = {
    searchLab: function(query, cb){
        client.get('http://api.archives-ouvertes.fr/search/?q=labStructName_t:'+query+'&fl=title_s,authFullName_s,uri_s,instStructName_s,labStructName_s',function(err, res, body) {
            data = JSON.parse(res.body);
            response = data.response.docs;
            cb(response);
        });
    }
};