const express = require("express");
const app = express();
const { connectToDB } = require("./database");
app.use(express.json());
app.get("/", async (req, res) => {
  //
  try {
    const db = await connectToDB();
    const collection = db.collection("users");
    const result = await collection.find().toArray();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/update-users", async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("users");
    const result = await collection.updateMany(
      { name: req.body.name },
      { $set: { age: req.body.age } }
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
});

app.delete("/delete-users/:name", async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = await db.collection("users");
    const result = await collection.deleteOne({
      name: req.params.name,
    });
    console.log(result);
    res.send("deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/users", async (req, res) => {
  try {
    console.log(req.body);
    const db = await connectToDB();
    const collection = db.collection("users");
    const result = await collection.insertOne(req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
