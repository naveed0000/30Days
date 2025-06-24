const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const UserModel = mongoose.model("users", UsersSchema);
const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/myDB");
  console.log("Connected to database");

  const newData = new UserModel();
  newData.name = "John"; 
  newData.age = 30;
  const result = await newData.save();
  console.log(result);
};

main();
