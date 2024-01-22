const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const dbPath = "mongodb://localhost/todo-list";

mongoose
  .connect(dbPath)
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((err) => {
    console.error(err);
  });
