const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  location: String
});

module.exports = mongoose.model("Employee", employeeSchema);
    