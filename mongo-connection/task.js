const { dbConnection } = require("./db");

async function main() {
  try {
    const db = await dbConnection();
    const result = await db.collection("users").find().toArray();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
module.exports = { main };
