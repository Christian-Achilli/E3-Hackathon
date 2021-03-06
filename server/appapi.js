var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
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

// List all apps
app.get('/app/:csi', function (req, res) {
	db.cypherQuery(
		    'MATCH (s:System {csi:{ csi }}) RETURN s',
		    req.params
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
		    'MERGE (s)-[:CONNECT]->(t:System {csi:{ to_csi }, name:{ name }}) ' +
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

module.exports = app;