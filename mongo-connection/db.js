const { MongoClient } = require("mongodb");
const url = `mongodb://localhost:27017`;

const client = new MongoClient(url);
const dbName = "myDB";

const dbConnection = async () => {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.log("Failed to connect to the database", err);
    throw err;
  }
};
module.exports = { dbConnection };
