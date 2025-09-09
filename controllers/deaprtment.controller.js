const Department = require('../models/Department.model');

// Render form to create a new department
exports.getDepartmentForm = (req, res) => {
    res.render('department_form', { title: 'Create Department', department: {} });
};

// Handle creation of a new department
exports.createDepartment = async (req, res) => {
    try {
        await Department.create(req.body);
        res.redirect('/departments');
    } catch (error) {
        res.status(400).send("Error creating department: " + error.message);
    }
};

// List all departments
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.render('departments', { title: 'Departments', departments });
    } catch (error) {
        res.status(500).send("Error fetching departments: " + error.message);
    }
};