const { dbConnection } = require("./db");

async function updateFunction() {
  try {
    const db = await dbConnection();
    const collection = await db.collection("users");

    const result = await collection.updateMany(
      { name: "John" },
      { $set: { age: 50 } }
    );
    console.log(result);
    const showDBRecord = await collection.find().toArray();
    console.log(showDBRecord);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = { updateFunction };
