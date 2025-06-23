const { dbConnection } = require("./db");

async function main() {
  try {
    const db = await dbConnection();
    const result = await db
      .collection("users")
      .insertOne({ name: "John", age: 30 });
    console.log(result);

    const result2 = await db.collection("users").find().toArray();
    console.log(result2);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  main,
};
