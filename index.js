const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');


const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err,client) => {

    assert.equal(err, null);

    console.log('Connected correctly to the server');

    const db = client.db(dbname);
   
    dboper.insertDocument(db, {name: "vadonut", description: "Test"}, "dishes", (result) => {

        console.log("insert document:\n", result.ops);

        dboper.findtDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updatetDocument(db, {name: "vadonut"}, {description: "Updated Test"}, "dishes", (result) => {

                console.log("Updated Document:\n", result.result);

                dboper.findtDocuments(db, "dishes", (docs) => {
                    console.log("Found Documents:\n", docs);

                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);

                        client.close();
                    });


                });

            });

        });
    });

});