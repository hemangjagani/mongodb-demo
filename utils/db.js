const { MongoClient } = require("mongodb");
const { config } = require("dotenv");
config();

const connectionString = process.env.MONGODB_URI || "";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(connectionString)
    .then((client) => {
      _db = client.db();
      callback(client);
    })
    .catch((error) => {
      console.log("Mongo error==>", error);
      throw error;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No Database Found!";
};

module.exports = { mongoConnect, getDB };
