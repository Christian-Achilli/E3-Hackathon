var express = require('express');
var app = express();
var db = require("../dao/neo4jdao");

app.get('/listapps', function (req, res) {
	db.cypherQuery(
		    'MATCH (systems) RETURN systems LIMIT 50',
		    {}
		     , function (err, result) {
		        if (err) {
		            return console.log(err);
		        }
		        console.log(result.data); // delivers an array of query results
		        console.log(result.columns); // delivers an array of names of objects getting returned
		        
		        res.end(JSON.stringify(result.data));
		    }
		);
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})

module.exports = app;