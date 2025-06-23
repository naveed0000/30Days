const { MongoClient } = require("mongodb");

const url = `mongodb://localhost:27017`;

const client = new MongoClient(url);
const dbName = "myDB";

const connectToDB = async () => {
  try {
    const dbConnect = await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { connectToDB };
