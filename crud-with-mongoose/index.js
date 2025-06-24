const express = require("express");
const mongoose = require("mongoose");

const URI =
  "mongodb+srv://root:root@cluster0.xt3ftsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(URI);

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
});

const BooksModel = mongoose.model("books", bookSchema);

const app = express();
app.use(express.json());

const PORT = 3000;

app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    const books = await BooksModel.find();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/insert-books", async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = new BooksModel({ title, author });
    console.log(newBook);
    const result = await newBook.save();
    res.json(result).status(201);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/update-books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;
    const result = await BooksModel.updateOne(
      { _id: id },
      { $set: { title, author } }
    );
    res.json(result).status(201);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/delete-books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BooksModel.deleteOne({ _id: id });
    res.json(result).status(201);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
