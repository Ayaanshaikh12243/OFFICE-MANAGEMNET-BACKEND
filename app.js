const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const departmentRoutes = require("./routes/departmentRoutes");

const app = express();

// Middleware used
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB set
mongoose.connect("mongodb://127.0.0.1:27017/officeDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const departmentRoutes = require("./routes/departmentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.render("index");
});
//Server check

app.listen(3000, () => console.log("Server running on port 3000"));
