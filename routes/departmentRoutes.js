const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// Create Department
router.post("/", async (req, res) => {
  const dept = new Department({ name: req.body.name });
  await dept.save();
  res.redirect("/departments");
});

// Get All Departments
router.get("/", async (req, res) => {
  const departments = await Department.find();
  res.render("departments", { departments });
});

module.exports = router;
