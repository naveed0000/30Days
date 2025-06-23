const { dbConnection } = require("./db");
async function deleteFunction() {
  try {
    const db = await dbConnection();
    const collection = await db.collection("users");
    const result = await collection.deleteMany({ name: "John", age: 50 });
    console.log(result);
    const showRecords = await collection.find().toArray();
    console.log(showRecords);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = {
  deleteFunction,
};
