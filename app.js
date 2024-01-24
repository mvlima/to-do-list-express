require("./config/database"); // Initialize DataBase
const path = require("path");
const express = require("express");
const methodOverride = require("method-override");

const rootRouter = require("./src/routes/index");
const taskRouter = require("./src/routes/task");
const checklistRouter = require("./src/routes/checklist");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method", { methods: ["GET", "POST"] }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", rootRouter);
app.use("/checklists", checklistRouter);
app.use("/checklists", taskRouter.checkListDependent);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
