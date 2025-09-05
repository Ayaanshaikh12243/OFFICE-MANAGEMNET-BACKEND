  const express = require("express");
  const router = express.Router();
  const Employee = require("../models/Employee");
  const Department = require("../models/Department");
  const axios = require("axios");

  // Create Employee with optional external API
  router.post("/", async (req, res) => {
    try {
      const { name, position, departmentId } = req.body;

      // Fallback location in case API fails
      let location = "Mumbai";

      // Try external API (optional)
      try {
        const response = await axios.get("https://fakerapi.it/api/v1/addresses?_quantity=1");
        location = response.data.data[0].city || location;
      } catch (err) {
        console.log("External API failed, using default location:", location);
      }

      const emp = new Employee({
        name,
        position,
        department: departmentId,
        location
      });

      await emp.save();
      res.redirect("/employees");

    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  });

  // Get all employees with department info
  router.get("/", async (req, res) => {
    try {
      const employees = await Employee.find().populate("department");
      const departments = await Department.find(); // for dropdown
      res.render("employees", { employees, departments });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  });

  module.exports = router;
