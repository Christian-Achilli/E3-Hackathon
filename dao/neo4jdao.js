//Require the Neo4J module
var neo4j = require('node-neo4j');

//Create a db object. We will using this object to work on the DB.
var db = new neo4j('http://neo4j:admin123@localhost:7474');

module.exports = db;