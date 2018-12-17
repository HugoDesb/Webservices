var request = require('request-json');
var client = request.createClient('http://localhost:8100/');

module.exports = {
    getDocs: function(query, cb){
        client.get('https://api.archives-ouvertes.fr/search/?q='+query,function(err, res, body) {
            console.log(res);
            cb(res.body);
        });
    }
};