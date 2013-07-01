var mongodb = require('mongodb'),
Db = mongodb.Db,
Server = mongodb.Server,
BSON = mongodb.BSONPure;

var DATABASE = 'jobdb';
var COLLECTION = 'jobs';

var db = new Db(DATABASE, new Server("localhost", 27017, {auto_reconnect: true}), {w: 1});

db.open(function(err, db) {
  console.log("Connected to '"+ DATABASE +"' database");
  db.collection(COLLECTION, {strict: true}, function(err, collection) {
    if (err instanceof Error) {
      console.log("The '"+COLLECTION+"' collection doesn't exist. Creating it with sample data...");
    db.collection(COLLECTION, function(err, collection) {
      collection.insert([], {safe:true}, function(err, result) {});
    });

    }
  });
});

exports.findById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving job: ' + id);
  db.collection(COLLECTION, function(err, collection) {
    collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
      res.send(item);
    });
  });
};

exports.findAll = function(req, res) {
  db.collection(COLLECTION, function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.addItem = function(req, res) {
  var job = req.body;
  console.log('Adding job: ' + JSON.stringify(job));
  db.collection(COLLECTION, function(err, collection) {
    collection.insert(job, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
};

exports.updateItem = function(req, res) {
  var id = req.params.id;
  var job = req.body;
  delete job._id;
  console.log('Updating job: ' + id);
  console.log(JSON.stringify(job));
  db.collection(COLLECTION, function(err, collection) {
    collection.update({'_id':new BSON.ObjectID(id)}, job, {safe:true}, function(err, result) {
      if (err) {
        console.log('Error updating job: ' + err);
        res.send({'error':'An error has occurred'});
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(job);
      }
    });
  });
};

exports.deleteItem = function(req, res) {
  var id = req.params.id;
  console.log('Deleting job: ' + id);
  db.collection(COLLECTION, function(err, collection) {
    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
};

