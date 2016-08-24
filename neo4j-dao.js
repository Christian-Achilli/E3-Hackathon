//Require the Neo4J module
var neo4j = require('node-neo4j');

//Create a db object. We will using this object to work on the DB.
db = new neo4j('http://neo4j:admin123@localhost:7474');

//Run raw cypher with params
db.cypherQuery(
    'MATCH (:System {name : {name}})-[:SENDS]->(outputs) RETURN outputs',
    {
        name: 'citissi',
    }, function (err, result) {
        if (err) {
            return console.log(err);
        }
        console.log(result.data); // delivers an array of query results
        console.log(result.columns); // delivers an array of names of objects getting returned
    }
);