var express = require('express');
var bodyParser = require('body-parser')
var app = express();
//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var db = require("../dao/neo4jdao");

// List all apps
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

// add new connection
app.post('/addapp', function (req, res) {
	console.log(req.body);
	db.cypherQuery(
		    'MATCH (s:System {csi : { from_csi }}) ' +
		    'CREATE (s)-[:CONNECT]->(t:System {csi:{ to_csi }, name:{ name }}) ' +
		    'RETURN s, t',
		    req.body,
		    function (err, result) {
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